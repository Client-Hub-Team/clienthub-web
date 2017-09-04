import { AccountantViewComponent } from '../accountant/accountant.component';
import { Component, OnInit, Input, PACKAGE_ROOT_URL, TemplateRef } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'underscore';
 
/**
 * Dashboard main page component. It's empty for now
 */
@Component({
  selector: 'app-resources-item',
  templateUrl: './resources-item.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesItemComponent implements OnInit {

  @Input() resource: any;
  @Input() link: boolean;

  constructor() {}

  ngOnInit(): void {

  }

}
