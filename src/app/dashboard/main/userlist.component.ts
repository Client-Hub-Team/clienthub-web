import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { AccountantService } from './accountant.service';

/**
 * Dashboard main page component. It's empty for now
 */
@Component({
  selector: 'app-userlist-widget',
  templateUrl: './userlist.component.html',
  styleUrls: []
})
export class UserlistWidgetComponent implements OnInit {

  clients: any;

  constructor(private localStorage: LocalStorageService, private accountantService: AccountantService) {

  }

  ngOnInit(): void {
    this.accountantService.get_clients().then((res) => {
      this.clients = res.json();
    });
  }

}
