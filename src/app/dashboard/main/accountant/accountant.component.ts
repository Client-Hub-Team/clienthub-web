import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { LoginService } from '../../../login/login.service';
import { AccountantService } from './accountant.service';


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

  constructor(private localStorage: LocalStorageService, private loginService: LoginService, private accountantService: AccountantService) {

  }

  ngOnInit(): void {
    this.user = this.localStorage.get('user');
    this.data = this.localStorage.get('data');
    this.company = this.localStorage.get('company');
  }

  logout(): void {
    this.loginService.logout();
  }

}
