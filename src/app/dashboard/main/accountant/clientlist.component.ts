import { AddClientModalComponent } from './modals/addClientModal.component';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { AccountantService } from './accountant.service';
import { NgPlural } from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

/**
 * Dashboard main page component. It's empty for now
 */
@Component({
  selector: 'app-clientlist-widget',
  templateUrl: './clientlist.component.html',
  styleUrls: []
})
export class ClientlistWidgetComponent implements OnInit {

  bsModalRef: BsModalRef;
  clients: any = [];

  constructor(
    private localStorage: LocalStorageService,
    private accountantService: AccountantService,
    private modalService: BsModalService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {

    this.toastr.setRootViewContainerRef(vcr);

  }

  public openAddClientModal(company) {
      this.bsModalRef = this.modalService.show(AddClientModalComponent);
      if (company != null) {
        this.bsModalRef.content.invited_to = company.id;
        this.bsModalRef.content.name = company.name;
      }
  }

  ngOnInit(): void {
    this.accountantService.get_clients().then((res) => {
      this.clients = res.json();

      this.accountantService.clients.next({clients: this.clients});

      if (this.clients.length > 0) {
        this.accountantService.get_client_info(this.clients[0].id).then(info => {
          console.log('info', info.json());
          this.accountantService.current_company.next({company: info.json().company});
          this.clients[0].active = true;
        });
      }

    });

    this.accountantService.clients.subscribe((sub) => {
      this.clients = sub.clients;
    });
  }

  get_client_info(company): any {
    this.clients.forEach(e => {
      e.active = false;
    });

    company.active = true;

    this.accountantService.get_client_info(company.id).then(info => {
      this.accountantService.current_company.next({company: info.json().company});
    });
  }

}
