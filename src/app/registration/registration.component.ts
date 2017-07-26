import { Component, OnInit } from '@angular/core';
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
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: [ './registration.component.css' ]
})
export class RegistrationComponent implements OnInit {


  constructor(private localStorage: LocalStorageService, private router: Router, private titleCtrl: Title) {}

  ngOnInit(): void {  }


}
