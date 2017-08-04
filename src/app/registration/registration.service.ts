import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { LocalStorageService } from 'angular-2-local-storage';
import { environment } from '../../environments/environment';


@Injectable()
export class RegistrationService {

  invite_info: any;
  email: any;

  constructor(private http: Http, private localStorage: LocalStorageService) {

  }


  check_invitation(email): Promise<any> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    // headers.set('Authorization', 'JWT ' + this.localStorage.get('access_token'));
    return this.http.post(`${environment.apiUrl}/user/invite.check`, {email: email}, options).toPromise();
  }

}
