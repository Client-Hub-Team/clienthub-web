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

  apps_in_use: any = {};
  all_apps: any = {};

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
    this.apps_in_use = [
      { "name": "QuickBooks", "category": "Accounting", "url": "https://qbo.intuit.com/qbo1/login", "logo": "gusto.png", "quick_login": "1"},
      { "name": "QuickBooks", "category": "Accounting", "url": "https://qbo.intuit.com/qbo1/login", "logo": "quickbooks.png", "quick_login": "0"},
      { "name": "QuickBooks", "category": "Accounting", "url": "https://qbo.intuit.com/qbo1/login", "logo": "mileiq.png", "quick_login": "0"},
      { "name": "QuickBooks", "category": "Accounting", "url": "https://qbo.intuit.com/qbo1/login", "logo": "tallie.png", "quick_login": "1"},
      { "name": "QuickBooks", "category": "Accounting", "url": "https://qbo.intuit.com/qbo1/login", "logo": "xero.png", "quick_login": "0"}
    ];
    this.all_apps = [
      { "name": "QuickBooks", "category": "Accounting", "url": "https://qbo.intuit.com/qbo1/login", "logo": "quickbooks.png", "quick_login": "1"},
      { "name": "QuickBooks", "category": "Accounting", "url": "https://qbo.intuit.com/qbo1/login", "logo": "xero.png", "quick_login": "0"},
      { "name": "QuickBooks", "category": "Accounting", "url": "https://qbo.intuit.com/qbo1/login", "logo": "bill.com.png", "quick_login": "1"},
      { "name": "QuickBooks", "category": "Accounting", "url": "https://qbo.intuit.com/qbo1/login", "logo": "hubdoc.png", "quick_login": "1"},
      { "name": "QuickBooks", "category": "Accounting", "url": "https://qbo.intuit.com/qbo1/login", "logo": "receipt-bank.png", "quick_login": "0"},
      { "name": "QuickBooks", "category": "Accounting", "url": "https://qbo.intuit.com/qbo1/login", "logo": "gusto.png", "quick_login": "1"},
      { "name": "QuickBooks", "category": "Accounting", "url": "https://qbo.intuit.com/qbo1/login", "logo": "expensify.png", "quick_login": "1"},
      { "name": "QuickBooks", "category": "Accounting", "url": "https://qbo.intuit.com/qbo1/login", "logo": "tallie.png", "quick_login": "0"},
      { "name": "QuickBooks", "category": "Accounting", "url": "https://qbo.intuit.com/qbo1/login", "logo": "tsheets.png", "quick_login": "1"},
      { "name": "QuickBooks", "category": "Accounting", "url": "https://qbo.intuit.com/qbo1/login", "logo": "mileiq.png", "quick_login": "1"},
      { "name": "QuickBooks", "category": "Accounting", "url": "https://qbo.intuit.com/qbo1/login", "logo": "gusto.png", "quick_login": "0"},
      { "name": "QuickBooks", "category": "Accounting", "url": "https://qbo.intuit.com/qbo1/login", "logo": "xero.png", "quick_login": "1"},
      { "name": "QuickBooks", "category": "Accounting", "url": "https://qbo.intuit.com/qbo1/login", "logo": "expensify.png", "quick_login": "0"}
    ];
  }

}
