import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { AccountantService } from './accountant.service';

/**
 * Dashboard main page component. It's empty for now
 */
@Component({
  selector: 'app-clientlist-widget',
  templateUrl: './clientlist.component.html',
  styleUrls: []
})
export class ClientlistWidgetComponent implements OnInit {

  clients: any;

  constructor(private localStorage: LocalStorageService, private accountantService: AccountantService) {

  }

  ngOnInit(): void {
    this.accountantService.get_clients().then((res) => {
      this.clients = res.json();
    });
  }

}
