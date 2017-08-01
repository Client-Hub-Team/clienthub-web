import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { LocalStorageService } from 'angular-2-local-storage';
import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {


  constructor(private http: Http, private localStorage: LocalStorageService, private router: Router) {

  }

  login(email, password): Promise<any> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    // headers.set('Authorization', 'JWT ' + this.localStorageService.get('access_token'));
    return this.http.post(`${environment.apiUrl}/api-token-auth/`, {username: email, password: password}, options).toPromise();
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
