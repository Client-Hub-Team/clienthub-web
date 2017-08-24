import { AddClientModalComponent } from './modals/addClientModal.component';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { LoginService } from '../../../login/login.service';
import { AccountantService } from './accountant.service';
import { Subscription } from 'rxjs/Subscription';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ClientlistWidgetComponent } from './clientlist.component';

/**
 * Dashboard main page component. It's empty for now
 */
@Component({
  selector: 'app-accountant-view',
  templateUrl: './accountant.component.html',
  styleUrls: []
})
export class AccountantViewComponent implements OnInit {

  bsModalRef: BsModalRef;
  user: any;
  data: any;
  company: any;
  current_company: any = {users: [], accountants: []};
  clientSubscription: Subscription;
  clients: any = [];

  constructor(
    private localStorage: LocalStorageService,
    private loginService: LoginService,
    private accountantService: AccountantService,
    private modalService: BsModalService
  ) {}

  public openAddClientModal(company) {
      this.bsModalRef = this.modalService.show(AddClientModalComponent);
      if (company != null) {
        this.bsModalRef.content.invited_to = company.id;
        this.bsModalRef.content.name = company.name;
      }
  }

  ngOnInit(): void {

    this.user = this.localStorage.get('user');
    this.data = this.localStorage.get('data');
    this.company = this.localStorage.get('company');

    this.clientSubscription = this.accountantService.current_company.subscribe(sub => {
      console.log(sub.company);
      this.current_company = sub.company;
    });

    const test = this.accountantService.clients.subscribe(sub => {
      this.clients = sub.clients;
    });
  }

  logout(): void {
    this.loginService.logout();
  }

}
