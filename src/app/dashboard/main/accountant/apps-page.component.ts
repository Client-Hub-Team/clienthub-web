import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { AccountantService } from './accountant.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormUtil } from '../../../utils/formutils';
import { GeneralUtil } from '../../../utils/general';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AddAccountantModalComponent } from './modals/addAccountantModal.component';

declare var jQuery: any;

/**
 * Dashboard main page component. It's empty for now
 */
@Component({
  selector: 'apps-page',
  templateUrl: './apps-page.component.html',
  styleUrls: []
})
export class AppsPageComponent implements OnInit {

  @ViewChild('logoInput') logoInput: ElementRef;
  @ViewChild('logoImage') logoImage: ElementRef;

  bsModalRef: BsModalRef;
  company: any = {};
  practiceInfoForm: FormGroup;
  formUtil: FormUtil;

  constructor(
    private localStorage: LocalStorageService,
    private accountantService: AccountantService,
    private formBuilder: FormBuilder,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private modalService: BsModalService
  ) {
    
  }

  ngOnInit(): void {
 
  }

}
