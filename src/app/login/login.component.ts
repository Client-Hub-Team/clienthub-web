import { Component } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: [ '../app.component.css' ]
})
export class LoginComponent {
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
      console.log(res.json());
      this.localStorage.set('access_token', res.json().access_token)
    })
  }

}
