import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  email: String = '';
  password: String = '';
  constructor(private loginService: LoginService, private localStorage: LocalStorageService, private router: Router) {

  }

  ngOnInit(): void {
    if (this.localStorage.get('access_token') !== undefined && this.localStorage.get('access_token') != null) {
      this.router.navigate(['/dashboard/main']);
    }
  }

  login() {
    this.loginService.login(this.email, this.password).then(res => {
      this.localStorage.set('access_token', res.json().access_token);
      this.localStorage.set('user', res.json().user);
      this.localStorage.set('data', res.json().data);
      this.localStorage.set('company', res.json().company);

      this.router.navigate(['/dashboard/main']);
    });
  }

}
