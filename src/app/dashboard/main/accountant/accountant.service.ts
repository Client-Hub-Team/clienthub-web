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

  current_company = new Subject<any>();
  clients = new Subject<any>();
  headers = new Headers();
  options: RequestOptions;

  constructor(private http: Http, private localStorage: LocalStorageService, private router: Router) {
    this.headers.set('Content-Type', 'application/json');
    this.headers.set('Authorization', 'JWT ' + this.localStorage.get('access_token'));
    this.options = new RequestOptions({ headers: this.headers });
  }

  get_clients(): Promise<any> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    headers.set('Authorization', 'JWT ' + this.localStorage.get('access_token'));
    return this.http.get(`${environment.apiUrl}/user/accountant.client.list`, options).toPromise();
  }

  get_client_info(company_id): Promise<any> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    headers.set('Authorization', 'JWT ' + this.localStorage.get('access_token'));
    return this.http.get(`${environment.apiUrl}/company/${company_id}`, options).toPromise();
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

  update_client_app_order(user_id, apps): Promise<any> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    headers.set('Authorization', 'JWT ' + this.localStorage.get('access_token'));
    return this.http.put(`${environment.apiUrl}/user/${user_id}/apps`, {apps: apps}, options).toPromise();
  }

  add_company_app(company_id, app_id): Promise<any> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    headers.set('Authorization', 'JWT ' + this.localStorage.get('access_token'));
    return this.http.post(`${environment.apiUrl}/company/${company_id}/apps`, {app_id: app_id}, options).toPromise();
  }

  delete_company_app(company_id, app_id): Promise<any> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    headers.set('Authorization', 'JWT ' + this.localStorage.get('access_token'));
    return this.http.patch(`${environment.apiUrl}/company/${company_id}/apps`, {app_id: app_id}, options).toPromise();
  }

  update_company_app_order(company_id, apps): Promise<any> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    headers.set('Authorization', 'JWT ' + this.localStorage.get('access_token'));
    return this.http.put(`${environment.apiUrl}/company/${company_id}/apps`, {apps: apps}, options).toPromise();
  }

  add_company_resource(company_id, resource_id): Promise<any> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    headers.set('Authorization', 'JWT ' + this.localStorage.get('access_token'));
    return this.http.post(`${environment.apiUrl}/company/${company_id}/resources`, {resource_id: resource_id}, options).toPromise();
  }

  delete_company_resource(company_id, resource_id): Promise<any> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    headers.set('Authorization', 'JWT ' + this.localStorage.get('access_token'));
    return this.http.patch(`${environment.apiUrl}/company/${company_id}/resources`, {resource_id: resource_id}, options).toPromise();
  }

  update_company_resource_order(company_id, resources): Promise<any> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    headers.set('Authorization', 'JWT ' + this.localStorage.get('access_token'));
    return this.http.put(`${environment.apiUrl}/company/${company_id}/resources`, {resources: resources}, options).toPromise();
  }

  get_company_info(): Promise<any> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    headers.set('Authorization', 'JWT ' + this.localStorage.get('access_token'));
    return this.http.get(`${environment.apiUrl}/company/`, options).toPromise();
  }

  update_company_info(company): Promise<any> {
    const headers = new Headers();
    // headers.set('Content-Type', 'multipart/form-data');
    headers.set('Authorization', 'JWT ' + this.localStorage.get('access_token'));
    const options = new RequestOptions({ headers: headers });
    return this.http.patch(`${environment.apiUrl}/company/`, company, options).toPromise();
  }

  invite_client(name, email, company_name, type, invited_to): Promise<any> {
    const data = {name: name, email: email, company_name: company_name, type: type, invited_to: invited_to};
    return this.http.post(`${environment.apiUrl}/user/invite`, data, this.options).toPromise();
  }

  add_resource(resource): Promise<any> {
    const headers = new Headers();
    headers.set('Authorization', 'JWT ' + this.localStorage.get('access_token'));
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${environment.apiUrl}/resources/`, resource, options).toPromise();
  }

}
