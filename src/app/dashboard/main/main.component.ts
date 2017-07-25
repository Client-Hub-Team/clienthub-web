import { Component } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
// import { LoginService } from './login.service';


/**
 * Dashboard main page component. It's empty for now
 */
@Component({
  selector: 'dashboard-main',
  templateUrl: './main.component.html',
  styleUrls: []
})
export class MainDashboardComponent {

  constructor(private localStorage: LocalStorageService) {

  }

  ngOnInit(): void {
    
  }

}
