import { AccountantViewComponent } from '../accountant/accountant.component';
import { Component, OnInit, TemplateRef, ViewChild, ElementRef, ViewContainerRef, QueryList } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormUtil } from '../../../utils/formutils';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { DashboardService } from '../../dashboard.service';
import { AccountantService } from '../accountant/accountant.service';
import { ManageResourcesModalComponent } from '../accountant/modals/manage-resources-modal.component';
import { Subscription } from 'rxjs/Subscription';
import { DragulaService } from 'ng2-dragula';
import * as _ from 'underscore';

/**
 * Resources widget
 */
@Component({
  selector: 'app-resources-widget',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesWidgetComponent implements OnInit {

  @ViewChild('resourceInput') resourceInput: ElementRef;

  bsModalRef: BsModalRef;
  public modalRef: BsModalRef;
  addResourceForm: FormGroup;
  formUtil: FormUtil;
  fileForm: FormData = new FormData();
  user: any;
  data: any;
  company: any;

  // Store global resources from /resource when ACCOUNTANT
  global_resources: any = [];

  // Store company specific resources from /resource when ACCOUNTANT
  practice_resources: any = [];

  // Store company specific resources from /resource when CLIENT
  company_resources: any = [];

  // Fixed copy for sorting purposes
  fixed_global_resources: any = [];


  innerWidth: any;
  current_client: any;
  showAddResource: any;

  search = '';
  clientSubscription: Subscription;
  sort_type = 'Order';
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
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private accountantService: AccountantService,
    vcr: ViewContainerRef
  ) {

    this.addResourceForm = this.formBuilder.group({
      name: [
        null,
        [Validators.required],
      ],
      description: [
        null,
        [],
      ],
      file: [
        null,
        [],
      ],
      category: [
        null,
        []
      ],
      file_type: [
        null,
        [Validators.required],
      ],
      url: [
        null,
        [],
      ],
    });

  }


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

    // Retrieve the resources for ACCOUNTANT or CLIENT
    this.dashboardService.get_resources().then((res) => {
      const response = res.json();
      this.global_resources = response.global_resources;
      this.company_resources = response.company_resources;
      this.practice_resources = response.practice_resources;
    });


    // Subscription to get current_client changes in client list
    this.clientSubscription = this.accountantService.current_company.subscribe(sub => {

      // Update CLIENT and RESOURCES variable
      this.current_client = sub.company;
      this.company_resources = sub.company.resources;
      // this.company_resources_list = sub.company.resources;

      // Calculate the differences between the full list and the client list
      // so it only shows in the complete list the apps that user doesnt have
      this.global_resources = _.filter(this.global_resources, (obj) => {
         return !_.findWhere(this.company_resources, obj);
      });

      this.practice_resources = _.filter(this.practice_resources, (obj) => {
        return !_.findWhere(this.company_resources, obj);
     });

    });

  }

  public openModal(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(ManageResourcesModalComponent, {class: 'modal-lg'});
    this.bsModalRef.content.company_resources = this.company_resources;

    this.bsModalRef.content.global_resources = this.global_resources;
    this.bsModalRef.content.practice_resources = this.practice_resources;

    // this.bsModalRef.content.all_resources_list = this.all_resources_list;
    this.bsModalRef.content.company_id = this.company.id;
    this.bsModalRef.content.current_client = this.current_client;
    
  }

  sort(type): void {
    this.sort_type = type.charAt(0).toUpperCase() + type.slice(1);
    if (type === 'title') {
      this.company_resources = _.sortBy(this.company_resources, 'name');
    } else if (type === 'type') {
      this.company_resources = _.sortBy(this.company_resources, 'file_type');
    } else {
      this.company_resources = _.sortBy(this.company_resources, 'order');
    }
  }

}
