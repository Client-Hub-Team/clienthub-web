import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { LocalStorageService } from 'angular-2-local-storage';
import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {


  constructor(private http: Http, private localStorageService: LocalStorageService) {

  }

  login(email, password): Promise<any> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    // headers.set('Authorization', 'JWT ' + this.localStorageService.get('access_token'));
    return this.http.post(`${environment.apiUrl}/api-token-auth/`, {username: email, password: password}, options).toPromise();
  }

}
