import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';


/**
 * Dashboard main page component. It's empty for now
 */
@Component({
  selector: 'app-practiceinfo',
  templateUrl: './practiceinfo.component.html',
  styleUrls: []
})
export class PracticeinfoComponent implements OnInit {


  constructor(private localStorage: LocalStorageService) {

  }

  ngOnInit(): void {}

}
