import { Component, ViewContainerRef, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { AccountantService } from '../accountant.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormUtil } from '../../../../utils/formutils';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DragulaService } from 'ng2-dragula';

  /* This is a component which we pass in modal*/
  @Component({
    selector: 'app-modal-manage-resources',
    templateUrl: './manage-resources-modal.component.html',
    providers: [DragulaService]
  })
  export class ManageResourcesModalComponent implements OnInit {
    public company_resources: any = [];
    public all_resources: any = [];
    public all_resources_list: any = [];
    public company_id: any;
    public current_client: any;

    addResourceForm: FormGroup;
    formUtil: FormUtil;
    fileForm: FormData = new FormData();
    showAddResource: boolean;

    dragulaOptions: any = {
        direction: 'horizontal'
    };

    @ViewChild('resourceInput') resourceInput: ElementRef;

    constructor(
      public bsModalRef: BsModalRef,
      private accountantService: AccountantService,
      private formBuilder: FormBuilder,
      public toastr: ToastsManager,
      vcr: ViewContainerRef,
      private dragulaService: DragulaService,
    ) {

    this.toastr.setRootViewContainerRef(vcr);

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
        // Subscription to the drop event from dragula. Used to calculate the order and update it
        // in the backend
        this.dragulaService.drop.subscribe((value) => {
            console.log('//ClientResourcesBag');
            if (value[0] === 'bag-resources-client') {
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
            }
        });
    }

    public addResourceScreen(value) {
        this.showAddResource = value;
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
        console.log(this.resourceInput);
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
        this.fileForm.append('company_id', this.company_id);

        this.accountantService.add_resource(this.fileForm).then((res) => {
            this.toastr.success('Resource added successfully!', 'Success!');
            if (this.resourceInput !== undefined) {
                this.resourceInput.nativeElement.value = '';
            }

            this.all_resources_list.unshift(res.json().resource);
            this.all_resources.unshift(res.json().resource);
            this.showAddResource = false;
        }, (err) => {
            console.log(err);
            this.toastr.error(err.json().message, 'Oops!');
        });
        }
    }


}
