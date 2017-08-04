import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { LoginService } from '../../../login/login.service';


/**
 * Dashboard main page component. It's empty for now
 */
@Component({
  selector: 'app-client-view',
  templateUrl: './client.component.html',
  styleUrls: []
})
export class ClientViewComponent implements OnInit {

  user: any;
  data: any;
  company: any;

  constructor(private localStorage: LocalStorageService, private loginService: LoginService) {

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
