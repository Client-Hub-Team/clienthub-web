import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { RegistrationService } from '../registration.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormUtil } from '../../utils/formutils';

/**
 * Registration main page component.
 */
@Component({
  selector: 'app-registration-main',
  templateUrl: './main.component.html',
  styleUrls: []
})
export class MainRegistrationComponent implements OnInit {

  invite: any = null;
  invite_info: any;
  emailForm: FormGroup;
  formUtil: FormUtil;

  constructor(
    private localStorage: LocalStorageService,
    private registrationService: RegistrationService,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {

    this.formUtil = new FormUtil();

    this.emailForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });

  }

  check_email(): void {
    this.registrationService.check_invitation(this.emailForm.get('email').value).then((res) => {
      const response = res.json();

      console.log(response);
      this.registrationService.email = this.emailForm.get('email').value;
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
