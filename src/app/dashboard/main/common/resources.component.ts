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

    // Retrieve the resources
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

  }

  public openModal(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(ManageResourcesModalComponent, {class: 'modal-lg'});
      this.bsModalRef.content.company_resources = this.company_resources;
      this.bsModalRef.content.all_resources = this.all_resources;
      this.bsModalRef.content.all_resources_list = this.all_resources_list;
      this.bsModalRef.content.company_id = this.company.id;
      this.bsModalRef.content.current_client = this.current_client;
  }

}
