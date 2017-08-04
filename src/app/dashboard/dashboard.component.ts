import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


/**
 * Dashboard component. It's the main header after the user is logged in
 It's also responsible to retrieve the brand and user info whenever
 a login is successfull.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  user: any;
  data: any;
  company: any;

  constructor(private localStorage: LocalStorageService, private router: Router) {}

  ngOnInit(): void {
    if (this.localStorage.get('company') == null || this.localStorage.get('company') === undefined) {
      this.router.navigate(['/registration/create']);
    }

    this.user = this.localStorage.get('user');
    this.data = this.localStorage.get('data');
    this.company = this.localStorage.get('company');
  }


  /**
   * Logout the current user by deleting the access_toekn from the localStorage.
   */
  logout(): void {
    this.localStorage.remove('access_token');
    this.localStorage.remove('data');
    this.localStorage.remove('user');
    this.localStorage.remove('company');
    this.router.navigate(['/login']);
  }

}
