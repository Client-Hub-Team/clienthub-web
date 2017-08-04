import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';


/**
 * Dashboard main page component. It's empty for now
 */
@Component({
  selector: 'app-resources-widget',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesWidgetComponent implements OnInit {

  user: any;
  data: any;
  company: any;


  constructor(private localStorage: LocalStorageService) {

  }

  ngOnInit(): void {
    this.user = this.localStorage.get('user');
    this.data = this.localStorage.get('data');
    this.company = this.localStorage.get('company');
  }

}
