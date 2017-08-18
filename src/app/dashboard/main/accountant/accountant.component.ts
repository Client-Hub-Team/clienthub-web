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
  current_client: any = {};
  clientSubscription: Subscription;
  clients: any = [];

  constructor(private localStorage: LocalStorageService, private loginService: LoginService, private accountantService: AccountantService) {

  }

  ngOnInit(): void {
    this.clientSubscription = this.accountantService.current_client.subscribe(sub => {
      this.current_client = sub.client;
    });

    this.accountantService.get_clients().then((res) => {
      this.clients = res.json();
    });
  }

  logout(): void {
    this.loginService.logout();
  }

}
