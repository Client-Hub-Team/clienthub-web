import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { LocalStorageService } from 'angular-2-local-storage';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class DashboardService {

  show_loading = new Subject<any>();

  constructor(private http: Http, private localStorage: LocalStorageService, private router: Router) {

  }

  get_apps(): Promise<any> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    headers.set('Authorization', 'JWT ' + this.localStorage.get('access_token'));
    return this.http.get(`${environment.apiUrl}/apps/`, options).toPromise();
  }

  get_resources(): Promise<any> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    headers.set('Authorization', 'JWT ' + this.localStorage.get('access_token'));
    return this.http.get(`${environment.apiUrl}/resources/`, options).toPromise();
  }

  get_client_apps(): Promise<any> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    headers.set('Authorization', 'JWT ' + this.localStorage.get('access_token'));
    return this.http.get(`${environment.apiUrl}/apps/`, options).toPromise();
  }

}
