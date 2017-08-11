import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { LocalStorageService } from 'angular-2-local-storage';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class AccountantService {

  current_client = new Subject<any>();

  constructor(private http: Http, private localStorage: LocalStorageService, private router: Router) {

  }

  get_clients(): Promise<any> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    headers.set('Authorization', 'JWT ' + this.localStorage.get('access_token'));
    return this.http.get(`${environment.apiUrl}/user/accountant.client.list`, options).toPromise();
  }

  get_client_info(user_id): Promise<any> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    headers.set('Authorization', 'JWT ' + this.localStorage.get('access_token'));
    return this.http.get(`${environment.apiUrl}/user/${user_id}`, options).toPromise();
  }

  add_client_app(user_id, app_id): Promise<any> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    headers.set('Authorization', 'JWT ' + this.localStorage.get('access_token'));
    return this.http.post(`${environment.apiUrl}/user/${user_id}/apps`, {app_id: app_id}, options).toPromise();
  }

  delete_client_app(user_id, app_id): Promise<any> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    headers.set('Authorization', 'JWT ' + this.localStorage.get('access_token'));
    return this.http.patch(`${environment.apiUrl}/user/${user_id}/apps`, {app_id: app_id}, options).toPromise();
  }

}
