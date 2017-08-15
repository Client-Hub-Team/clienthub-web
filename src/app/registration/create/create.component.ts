import { ValidateFn } from 'codelyzer/walkerFactory/walkerFn';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { CreateService } from './create.service';
import { LoginService } from '../../login/login.service';
import { RegistrationService } from '../registration.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormUtil } from '../../utils/formutils';


/**
 * Create new Pratice/Account component.
 */
@Component({
  selector: 'app-create-main',
  templateUrl: './create.component.html',
  styleUrls: []
})
export class CreateComponent implements OnInit {

  step: number;
  email: string;
  password: string;
  user_type: number;
  access_level: number;
  company_id: number;
  company_name: string;
  company_handle: string;
  invited: boolean;
  infoForm: FormGroup;
  companyForm: FormGroup;
  formUtil: FormUtil;
  infoFormSubmitAttempt: boolean;
  companyFormSubmitAttempt: boolean;

  constructor(
    private localStorage: LocalStorageService,
    private createService: CreateService,
    private loginService: LoginService,
    private registrationService: RegistrationService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {

  }


  ngOnInit(): void {
    if (
      this.localStorage.get('data') !== undefined &&
      this.localStorage.get('data') !== null &&
      this.localStorage.get('user') !== undefined &&
      this.localStorage.get('user') !== null
    ) {
      console.log('User already created');
      if (this.localStorage.get('data')['company'] == null) {
        this.step = 3;
      } else if (this.localStorage.get('user') == null || this.localStorage.get('user') === undefined ) {
        this.router.navigate(['/registration/select']);
      } else {
        this.router.navigate(['/dashboard/main']);
      }
    } else {
        console.log('Creating a new user: ', this.registrationService.email);
        this.email = this.registrationService.email;
        this.localStorage.set('temp_email', this.email);

        if (this.registrationService.invite_info != null && this.registrationService.invite_info !== undefined) {
          console.log('User was invited');
          this.invited = true;

          // Accountant or Client
          this.user_type = this.registrationService.invite_info.type;

          if (this.registrationService.invite_info.invited_to !== null) {
            this.company_id = this.registrationService.invite_info.invited_to.id;
          } else {
            this.company_id = null;
          }

          // If company_id is null, then the user will be the first one, and will be the company admin
          this.access_level = this.company_id == null ? 1 : 2;
        } else {
          this.user_type = 1;
          this.access_level = 1;
          this.invited = false;
        }

      this.step = 2;
    }

    this.formUtil = new FormUtil();

    this.infoForm = this.formBuilder.group({
      first_name: [
        null,
        [Validators.required],
      ],
      last_name: [
        null,
        [Validators.required],
      ],
      password: [
        null,
        [Validators.required, this.formUtil.validatePassword]
      ]
    });

    this.companyForm = this.formBuilder.group({
      company_name: [
        null,
        [Validators.required],
      ]
    });
  }

  step_name_and_password(): void {

    this.infoFormSubmitAttempt = true;
    if (this.infoForm.valid) {
      // add more info to localStorage in case user goes back
      this.localStorage.set('temp_first_name', this.infoForm.get('first_name').value);
      this.localStorage.set('temp_last_name', this.infoForm.get('last_name').value);

      // creates the user account
      this.createService.add_user(
        this.infoForm.get('first_name').value,
        this.infoForm.get('last_name').value,
        this.email,
        this.infoForm.get('password').value,
        this.user_type,
        this.access_level,
        this.company_id
      ).then(res => {
        const response = res.json();
        this.localStorage.set('data', response.data);
        this.localStorage.set('user', response.user);

        // removes temporary info from localStorage
        this.localStorage.remove('temp_email');
        this.localStorage.remove('temp_first_name');
        this.localStorage.remove('temp_last_name');

        this.loginService.login(this.email, this.infoForm.get('password').value).then(loginRes => {
          const loginResponse = loginRes.json();
          this.localStorage.set('access_token', loginResponse.access_token);
          this.localStorage.set('company', loginResponse.company);

          if (this.invited && this.company_id !== null) {
            // Do something here to tell the user that his account is complete
            this.router.navigate(['/dashboard/main']);
          } else {
            this.step = 3;
          }
        });
      });
    }
  }

  add_company(): void {
    let is_accounting = true;
    let invite_id = null;
    if (this.registrationService.invite_info !== null) {
      invite_id = this.registrationService.invite_info.id;
      if (this.registrationService.invite_info.type === 2) {
        is_accounting = false;
      }
    }

    // console.log('is_accounting', is_accounting);
    // console.log('invite_id', invite_id);

    this.createService.add_company(
      this.companyForm.get('company_name').value,
      this.company_handle,
      is_accounting,
      invite_id
    ).then((res) => {
      const response = res.json();
      this.localStorage.set('data', response.data);
      this.localStorage.set('company', response.company);
      this.router.navigate(['/dashboard/main']);
    });
  }
}
