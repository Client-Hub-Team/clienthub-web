import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
// import { LoginService } from './login.service';


/**
 * Dashboard main page component. It's empty for now
 */
@Component({
  selector: 'app-dashboard-main',
  templateUrl: './main.component.html',
  styleUrls: []
})
export class MainDashboardComponent implements OnInit {

  user: any;
  data: any;
  practice: any;

  slides = [
      {img: "http://placehold.it/64x64/2c9f1c", name: "Application name", description: "Last activity: 5 days ago"},
      {img: "http://placehold.it/64x64/df1f26", name: "Application name", description: "Last activity: 5 days ago"},
      {img: "http://placehold.it/64x64/f67800", name: "Application name", description: "Last activity: 5 days ago"},
      {img: "http://placehold.it/64x64/673e92", name: "Application name", description: "Last activity: 5 days ago"},
      {img: "http://placehold.it/64x64/0084ff", name: "Application name", description: "Last activity: 5 days ago"},
      {img: "http://placehold.it/64x64/555", name: "Application name", description: "Last activity: 5 days ago"},
      {img: "http://placehold.it/64x64/ffb400", name: "Application name", description: "Last activity: 5 days ago"}
    ];
    slideConfig = {
      "slidesToShow": 3,
      "slidesToScroll": 3,
      "dots": true
    };

  constructor(private localStorage: LocalStorageService) {

  }

  ngOnInit(): void {
    this.user = this.localStorage.get('user');
    this.data = this.localStorage.get('data');
    this.practice = this.localStorage.get('practice');
  }

}
