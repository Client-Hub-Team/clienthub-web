import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

/**
 * Registration main page component.
 */
@Component({
  selector: 'app-registration-main',
  templateUrl: './main.component.html',
  styleUrls: [ '../registration.component.css' ]
})
export class MainRegistrationComponent implements OnInit {

  constructor(private localStorage: LocalStorageService) {

  }

  ngOnInit(): void {}

}
