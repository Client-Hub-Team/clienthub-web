import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { LocalStorageService } from 'angular-2-local-storage';
import { environment } from '../../../../environments/environment';


@Injectable()
export class AccountantService {

  constructor(private http: Http, private localStorage: LocalStorageService, private router: Router) {

  }

  get_clients(): Promise<any> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    headers.set('Authorization', 'JWT ' + this.localStorage.get('access_token'));
    return this.http.get(`${environment.apiUrl}/user/accountant.client.list`, options).toPromise();
  }

}
