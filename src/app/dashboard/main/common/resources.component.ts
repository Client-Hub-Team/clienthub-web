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
  selector: 'app-resources-widget',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesWidgetComponent implements OnInit {

  public modalRef: BsModalRef;
  user: any;
  data: any;
  company: any;
  all_resources: any;
  company_resources: any = [];
  innerWidth: any;
  current_client: any;
  showAddResource: any;
  all_resources_list: any;
  clientSubscription: Subscription;
  dragulaOptions: any = {
    direction: 'horizontal'
  };

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

    this.showAddResource = false;

    this.innerWidth = (window.screen.width);

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

    this.dashboardService.get_resources().then((res) => {
      const response = res.json();
      this.all_resources_list = response.all_resources;
      this.company_resources = response.company_resources;
      this.all_resources = response.all_resources;
    });


    // Subscription to get current_client changes in client list
    this.clientSubscription = this.accountantService.current_company.subscribe(sub => {

      console.log('Changed company', sub);

      // Update client and apps variables
      this.all_resources = this.all_resources_list;
      this.current_client = sub.company;
      this.company_resources = sub.company.resources;

      // Calculate the differences between the full list and the client list
      // so it only shows in the complete list the apps that user doesnt have
      this.all_resources = _.filter(this.all_resources, (obj) => {
         return !_.findWhere(this.company_resources, obj);
      });

    });


    // Subscription to the drop event from dragula. Used to calculate the order and update it
    // in the backend
    this.dragulaService.drop.subscribe((value) => {
      let order = 0;
      this.company_resources.forEach((v) => {
        v.order = order;
        order++;
      });

      this.accountantService.update_company_resource_order(this.current_client.id, this.company_resources).then((res) => {
        const response = res.json();
      }, (err) => {
        console.log(err);
      });

    });

  }

  public addResourceScreen(value) {
    this.showAddResource = value;
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  add_company_resource(resource, index): void {
    this.accountantService.add_company_resource(this.current_client.id, resource.id).then((res) => {
        const response = res.json();
        resource.order = response.order;
        resource.company_app_id = response.company_app_id;
        this.company_resources.push(resource);
        this.all_resources.splice(index, 1);
    });
  }

  delete_company_resource(resource, index): void {
    this.accountantService.delete_company_resource(this.current_client.id, resource.id).then((res) => {
        this.all_resources.push(resource);
        this.company_resources.splice(index, 1);
    });
  }

}
