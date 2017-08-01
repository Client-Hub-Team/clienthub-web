import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { LocalStorageService } from 'angular-2-local-storage';
import { environment } from '../../environments/environment';


@Injectable()
export class DashboardService {

  constructor(private http: Http, private localStorage: LocalStorageService, private router: Router) {

  }

}
