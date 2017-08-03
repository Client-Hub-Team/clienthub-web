import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
// import { LoginService } from './login.service';


/**
 * Dashboard main page component. It's empty for now
 */
@Component({
  selector: 'app-dashboard-main',
  templateUrl: './main.component.html',
  styleUrls: []
})
export class MainDashboardComponent implements OnInit {

  user: any;
  data: any;
  company: any;

  constructor(private localStorage: LocalStorageService) {

  }

  ngOnInit(): void {
    this.user = this.localStorage.get('user');
    this.data = this.localStorage.get('data');
    this.company = this.localStorage.get('company');
  }

}
