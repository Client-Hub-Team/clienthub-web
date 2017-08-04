import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { RegistrationService } from '../registration.service';

/**
 * Registration main page component.
 */
@Component({
  selector: 'app-registration-main',
  templateUrl: './main.component.html',
  styleUrls: []
})
export class MainRegistrationComponent implements OnInit {

  email: string;
  invite: any = null;
  invite_info: any;

  constructor(private localStorage: LocalStorageService, private registrationService: RegistrationService) {

  }

  ngOnInit(): void {}

  check_email(): void {
    this.registrationService.check_invitation(this.email).then((res) => {
      const response = res.json();

      console.log(response);
      this.registrationService.email = this.email;
      this.registrationService.invite_info = null;
      if (response.invites.length > 0) {
        this.invite = true;
        this.invite_info = response.invites[0];
        this.registrationService.invite_info = this.invite_info;
      } else {
        this.invite = false;
      }

    });
  }

}
