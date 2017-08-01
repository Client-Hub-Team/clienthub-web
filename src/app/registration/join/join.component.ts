// import { Component, OnInit } from '@angular/core';
// import { LocalStorageService } from 'angular-2-local-storage';
// import { CreateService } from './create.service';
// import { LoginService } from '../../login/login.service';
// import { Router } from '@angular/router';


// /**
//  * Create new Pratice/Account component.
//  */
// @Component({
//   selector: 'app-create-main',
//   templateUrl: './create.component.html',
//   styleUrls: []
// })
// export class CreateComponent implements OnInit {

//   step: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   password: string;
//   company_name: string;
//   company_handle: string;

//   constructor(
//     private localStorage: LocalStorageService,
//     private createService: CreateService,
//     private loginService: LoginService,
//     private router: Router
//   ) {

//   }

//   ngOnInit(): void {
//     if (
//       this.localStorage.get('data') !== undefined &&
//       this.localStorage.get('data') !== null &&
//       this.localStorage.get('user') !== undefined &&
//       this.localStorage.get('user') !== null
//     ) {
//       console.log('User already created');
//       if (this.localStorage.get('data')['company'] == null) {
//         this.step = 3;
//       } else if (this.localStorage.get('user') == null || this.localStorage.get('user') === undefined ) {
//         this.step = 1;
//       } else {
//         this.router.navigate(['/dashboard/main']);
//       }
//     } else {
//       this.step = 1;
//     }
//   }

//   step_email(): void {
//     // add email to localStorage in case user goes back
//     this.localStorage.set('temp_email', this.email);
//     this.step = 2;
//   }

//   step_name_and_password(): void {
//     // add more info to localStorage in case user goes back
//     this.localStorage.set('temp_first_name', this.first_name);
//     this.localStorage.set('temp_last_name', this.last_name);

//     // creates the user account
//     this.createService.add_user(this.first_name, this.last_name, this.email, this.password, 1, 1).then(res => {
//       const response = res.json();
//       this.localStorage.set('data', response.data);
//       this.localStorage.set('user', response.user);

//       // removes temporary info from localStorage
//       this.localStorage.remove('temp_email');
//       this.localStorage.remove('temp_first_name');
//       this.localStorage.remove('temp_last_name');

//       this.loginService.login(this.email, this.password).then(loginRes => {
//         const loginResponse = loginRes.json();
//         this.localStorage.set('access_token', loginResponse.access_token);
//         this.step = 3;
//       });
//     });
//   }

//   add_company(): void {
//     this.createService.add_company(this.company_name, this.company_handle, true).then((res) => {
//       const response = res.json();
//       this.localStorage.set('data', response.data);
//       this.localStorage.set('company', response.company);
//       this.router.navigate(['/dashboard/main']);
//     });
//   }
// }
