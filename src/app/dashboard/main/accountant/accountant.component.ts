import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { LoginService } from '../../../login/login.service';
import { AccountantService } from './accountant.service';
import { Subscription } from 'rxjs/Subscription';


/**
 * Dashboard main page component. It's empty for now
 */
@Component({
  selector: 'app-accountant-view',
  templateUrl: './accountant.component.html',
  styleUrls: []
})
export class AccountantViewComponent implements OnInit {

  user: any;
  data: any;
  company: any;
  current_company: any = {};
  clientSubscription: Subscription;
  clients: any = [];

  constructor(private localStorage: LocalStorageService, private loginService: LoginService, private accountantService: AccountantService) {

  }

  ngOnInit(): void {
    this.clientSubscription = this.accountantService.current_company.subscribe(sub => {
      console.log('Subscription to current client', sub);
      this.current_company = sub.company;
    });

    const test = this.accountantService.clients.subscribe(sub => {
      console.log('Subscription to client list', sub);
      this.clients = sub.clients;
    });
  }

  logout(): void {
    this.loginService.logout();
  }

}
