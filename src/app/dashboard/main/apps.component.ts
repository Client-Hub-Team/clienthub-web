import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';


/**
 * Dashboard main page component. It's empty for now
 */
@Component({
  selector: 'app-apps-widget',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.css']
})
export class AppsWidgetComponent implements OnInit {

  user: any;
  data: any;
  company: any;

  innerWidth: any;

  slides = [
<<<<<<< HEAD
      {img: 'http://placehold.it/64x64/2c9f1c', name: 'Application name', description: 'Last activity: 5 days ago'},
      {img: 'http://placehold.it/64x64/df1f26', name: 'Application name', description: 'Last activity: 5 days ago'},
      {img: 'http://placehold.it/64x64/f67800', name: 'Application name', description: 'Last activity: 5 days ago'},
      {img: 'http://placehold.it/64x64/673e92', name: 'Application name', description: 'Last activity: 5 days ago'},
      {img: 'http://placehold.it/64x64/0084ff', name: 'Application name', description: 'Last activity: 5 days ago'},
      {img: 'http://placehold.it/64x64/555', name: 'Application name', description: 'Last activity: 5 days ago'},
      {img: 'http://placehold.it/64x64/ffb400', name: 'Application name', description: 'Last activity: 5 days ago'}
  ];
  slideConfig = {
    'slidesToShow': 3,
    'slidesToScroll': 3,
    'dots': true
  };

    constructor(private localStorage: LocalStorageService) {}

  ngOnInit(): void {

    this.innerWidth = (window.screen.width);
    console.log(this.innerWidth);

    this.user = this.localStorage.get('user');
    this.data = this.localStorage.get('data');
    this.company = this.localStorage.get('company');

    if( this.innerWidth < 600 ) {
        this.slideConfig = {
          'slidesToShow': 2,
          'slidesToScroll': 2,
          'dots': true
        };
    }
  }

}
