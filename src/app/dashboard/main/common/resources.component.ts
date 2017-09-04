import { AccountantViewComponent } from '../accountant/accountant.component';
import { Component, OnInit, PACKAGE_ROOT_URL, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormUtil } from '../../../utils/formutils';
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

  @ViewChild('resourceInput') resourceInput: ElementRef;

  constructor(
    private localStorage: LocalStorageService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
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

    this.addResourceForm = this.formBuilder.group({
      name: [
        null,
        [Validators.required],
      ],
      description: [
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
    this.showAddResource = false;
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  add_company_resource(resource, index): void {
    this.accountantService.add_company_resource(this.current_client.id, resource.id).then((res) => {
        const response = res.json();
        resource.order = response.order;
        resource.company_resource_id = response.company_resource_id;
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

  saveResource(): void {
    this.fileForm = new FormData();

    if (this.addResourceForm.valid) {
      if (this.resourceInput !== undefined) {
        const fileList: FileList = this.resourceInput.nativeElement.files;
        if (fileList.length > 0) {
            const file: File = fileList[0];
            this.fileForm.append('file', file, file.name);
        }
      }

      this.fileForm.append('name', this.addResourceForm.get('name').value);
      this.fileForm.append('category', this.addResourceForm.get('category').value);
      this.fileForm.append('url', this.addResourceForm.get('url').value);
      this.fileForm.append('file_type', this.addResourceForm.get('file_type').value);
      this.fileForm.append('description', this.addResourceForm.get('description').value);
      this.fileForm.append('company_id', this.company.id);

      this.accountantService.add_resource(this.fileForm).then((res) => {
        // this.toastr.success('Resource added successfully!', 'Success!');
        if (this.resourceInput !== undefined) {
          this.resourceInput.nativeElement.value = '';
        }
      }, (err) => {
        console.log(err);
        // this.toastr.error(err.json().message, 'Oops!');
      });
    }
  }

}
