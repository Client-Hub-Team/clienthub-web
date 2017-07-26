import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
// import { LoginService } from './login.service';


/**
 * Dashboard main page component. It's empty for now
 */
@Component({
  selector: 'app-create-main',
  templateUrl: './create.component.html',
  styleUrls: []
})
export class CreateComponent implements OnInit {

  constructor(private localStorage: LocalStorageService) {

  }

  ngOnInit(): void {}

}
