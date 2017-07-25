import { Component } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { DomSanitizer } from '@angular/platform-browser';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


/**
 * Dashboard component. It's the main header after the user is logged in
 It's also responsible to retrieve the brand and user info whenever
 a login is successfull.
 */
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent {

  name: String = '';
  bg: any = {};
  header_bg: any = {};
  logo: String = '';
  site: String = '';
  style: any = '';

  constructor(private localStorage: LocalStorageService, private sanitizer: DomSanitizer, private router: Router, private titleCtrl: Title) {

  }

  ngOnInit(): void {
    let brand = this.localStorage.get('brand')['brand']
    let user = this.localStorage.get('brand')['brand']['user']

    this.name = user.name;
    this.bg[brand.bg.split(':')[0]] = brand.bg.split(':')[1]
    this.header_bg[brand.header_bg.split(':')[0]] = brand.header_bg.split(':')[1]
    this.logo = brand.logo
    this.site = brand.site
    this.style = this.sanitizer.bypassSecurityTrustStyle(brand.style);
    this.titleCtrl.setTitle(`${brand.name} powered by ALANA`);
  }


  /**
   * Logout the current user by deleting the access_toekn from the localStorage.
   */
  logout(): void {
    this.localStorage.remove('access_token');
    this.localStorage.remove('brand');
    this.router.navigate(['/login']);
  }

}
