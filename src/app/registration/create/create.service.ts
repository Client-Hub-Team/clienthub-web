import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { LocalStorageService } from 'angular-2-local-storage';
import { environment } from '../../../environments/environment';


@Injectable()
export class CreateService {

  constructor(private http: Http, private localStorageService: LocalStorageService) {

  }

  add_user(first_name, last_name, email, password, user_type, access_level, company_id, invite_id): Promise<any> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    // headers.set('Authorization', 'JWT ' + this.localStorageService.get('access_token'));
    const options = new RequestOptions({ headers: headers });
    const data = {
        username: email,
        email: email,
        first_name: first_name,
        last_name: last_name,
        password: password,
        user_type: user_type,
        access_level: access_level,
        company_id: company_id,
        invite_id: invite_id
    };
    return this.http.post(`${environment.apiUrl}/user/create`, data, options).toPromise();
  }

  add_company(name, handle, is_accounting, invite_id): Promise<any> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', 'JWT ' + this.localStorageService.get('access_token'));
    const options = new RequestOptions({ headers: headers });
    const data = {
      name: name,
      handle: handle,
      owner: this.localStorageService.get('user')['id'],
      is_accounting: true,
      invite_id: invite_id
    };

    console.log(data);
    return this.http.post(`${environment.apiUrl}/company/create`, data, options).toPromise();
  }

}
