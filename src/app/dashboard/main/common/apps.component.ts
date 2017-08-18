import { AccountantViewComponent } from '../accountant/accountant.component';
import { Component, OnInit, PACKAGE_ROOT_URL, TemplateRef } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { DashboardService } from '../../dashboard.service';
import { AccountantService } from '../accountant/accountant.service';
import { Subscription } from 'rxjs/Subscription';
import { DragulaService } from 'ng2-dragula';
import * as _ from 'underscore';

/**
 * Dashboard main page component. It's empty for now
 */
@Component({
  selector: 'app-apps-widget',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.css']
})
export class AppsWidgetComponent implements OnInit {

  public modalRef: BsModalRef;
  user: any;
  data: any;
  company: any;
  all_apps: any;
  company_apps: any = [];
  innerWidth: any;
  current_client: any;
  all_apps_list: any;
  clientSubscription: Subscription;

  slideConfig = {
    'slidesToShow': 3,
    'slidesToScroll': 3,
    'dots': true
  };

  constructor(
    private localStorage: LocalStorageService,
    private modalService: BsModalService,
    private dashboardService: DashboardService,
    private accountantService: AccountantService,
    private dragulaService: DragulaService
  ) {}

  ngOnInit(): void {

    this.innerWidth = (window.screen.width);
    console.log(this.innerWidth);

    this.user = this.localStorage.get('user');
    this.data = this.localStorage.get('data');
    this.company = this.localStorage.get('company');

    if (this.innerWidth < 600) {
        this.slideConfig = {
          'slidesToShow': 2,
          'slidesToScroll': 2,
          'dots': true
        };
    }

    this.dashboardService.get_apps().then((res) => {
      const response = res.json();
      this.all_apps_list = response.all_apps;
      this.company_apps = response.company_apps;
      this.all_apps = response.all_apps;
    });


    // Subscription to get current_client changes in client list
    this.clientSubscription = this.accountantService.current_company.subscribe(sub => {

      console.log('Changed company', sub);

      // Update client and apps variables
      this.all_apps = this.all_apps_list;
      this.current_client = sub.company;
      this.company_apps = sub.company.apps;

      // Calculate the differences between the full list and the client list
      // so it only shows in the complete list the apps that user doesnt have
      this.all_apps = _.filter(this.all_apps, (obj) => {
         return !_.findWhere(this.company_apps, obj);
      });

    });


    // Subscription to the drop event from dragula. Used to calculate the order and update it
    // in the backend
    this.dragulaService.drop.subscribe((value) => {
      let order = 0;
      this.company_apps.forEach((v) => {
        v.order = order;
        order++;
      });

      this.accountantService.update_company_app_order(this.current_client.id, this.company_apps).then((res) => {
        const response = res.json();
      }, (err) => {
        console.log(err);
      });

    });

  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  add_company_app(app, index): void {
    this.accountantService.add_company_app(this.current_client.id, app.id).then((res) => {
        const response = res.json();
        app.order = response.order;
        app.company_app_id = response.company_app_id;
        this.company_apps.push(app);
        this.all_apps.splice(index, 1);
    });
  }

  delete_company_app(app, index): void {
    this.accountantService.delete_company_app(this.current_client.id, app.id).then((res) => {
        this.all_apps.push(app);
        this.company_apps.splice(index, 1);
    });
  }

}
