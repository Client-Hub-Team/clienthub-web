import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
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
  selector: 'app-practiceinfo',
  templateUrl: './practiceinfo.component.html',
  styleUrls: []
})
export class PracticeinfoComponent implements OnInit, AfterViewChecked {

  @ViewChild('logoInput') logoInput: ElementRef;
  @ViewChild('logoImage') logoImage: ElementRef;

  bsModalRef: BsModalRef;
  company: any = {};
  practiceInfoForm: FormGroup;
  formUtil: FormUtil;
  color: any;
  file: any;
  fileForm: FormData = new FormData();
  generalUtil = new GeneralUtil();
  data: any = {};

  constructor(
    private localStorage: LocalStorageService,
    private accountantService: AccountantService,
    private formBuilder: FormBuilder,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private modalService: BsModalService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this.formUtil = new FormUtil();

    this.practiceInfoForm = this.formBuilder.group({
      name: [
        null,
        [Validators.required],
      ],
      logo: [
        null,
        [],
      ],
      website: [
        null,
        []
      ],
      twitter: [
        null,
        [],
      ],
      facebook: [
        null,
        [],
      ],
      linkedin: [
        null,
        [],
      ],
      color: [
        null,
        []
      ]
    });
  }

  ngOnInit(): void {
    this.data = this.localStorage.get('data');

    this.accountantService.get_company_info().then(info => {
      this.company = info.json();
      this.practiceInfoForm.patchValue(
        {
          name: this.company.name,
          website: this.company.url,
          twitter: this.company.twitter,
          facebook: this.company.facebook,
          linkedin: this.company.linkedin,
          color: this.company.color
        }
      );

      this.color = this.company.color;
      this.practiceInfoForm.get('name').markAsTouched();
    });
  }

  ngAfterViewChecked() {
      jQuery(document).trigger('refreshColorContrast');
  }

  public openAddAccountantModal(company) {
      this.bsModalRef = this.modalService.show(AddAccountantModalComponent);
      if (company != null) {
        this.bsModalRef.content.invited_to = company.id;
        this.bsModalRef.content.name = company.name;
        this.bsModalRef.content.pending_accountants = company.pending_accountants;
      }
  }

  saveCompany(): void {
    const fileList: FileList = this.logoInput.nativeElement.files;
    if (fileList.length > 0) {
        const file: File = fileList[0];
        this.fileForm.append('file', file, file.name);
    }

    this.fileForm.append('name', this.practiceInfoForm.get('name').value);
    this.fileForm.append('url', this.practiceInfoForm.get('website').value);
    this.fileForm.append('twitter', this.practiceInfoForm.get('twitter').value);
    this.fileForm.append('facebook', this.practiceInfoForm.get('facebook').value);
    this.fileForm.append('linkedin', this.practiceInfoForm.get('linkedin').value);
    this.fileForm.append('color', this.practiceInfoForm.get('color').value);

    this.accountantService.update_company_info(this.fileForm).then((res) => {
      this.toastr.success('Company info updated successfully!', 'Success!');
      this.logoInput.nativeElement.value = '';
    }, (err) => {
      console.log(err);
      this.toastr.error(err.json().message, 'Oops!');
    });
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
        const file: File = fileList[0];
        this.logoImage.nativeElement.src = URL.createObjectURL(file);
    }
  }

  changeColor(color): void {
    this.practiceInfoForm.patchValue({
      color: color
    });
  }

}
