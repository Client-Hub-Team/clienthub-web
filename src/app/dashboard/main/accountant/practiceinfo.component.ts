import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { AccountantService } from './accountant.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormUtil } from '../../../utils/formutils';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

declare var jQuery: any;

/**
 * Dashboard main page component. It's empty for now
 */
@Component({
  selector: 'app-practiceinfo',
  templateUrl: './practiceinfo.component.html',
  styleUrls: []
})
export class PracticeinfoComponent implements OnInit {

  company: any;
  practiceInfoForm: FormGroup;
  formUtil: FormUtil;
  color: any;

  constructor(
    private localStorage: LocalStorageService,
    private accountantService: AccountantService,
    private formBuilder: FormBuilder,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
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

  saveCompany(): void {
    const data = {
      name: this.practiceInfoForm.get('name').value,
      url: this.practiceInfoForm.get('website').value,
      twitter: this.practiceInfoForm.get('twitter').value,
      facebook: this.practiceInfoForm.get('facebook').value,
      linkedin: this.practiceInfoForm.get('linkedin').value,
      color: this.practiceInfoForm.get('color').value
    };

    this.accountantService.update_company_info(data).then((res) => {
      this.toastr.success('Company info updated successfully!', 'Success!');
    }, (err) => {
      console.log(err);
      this.toastr.error(err.json().message, 'Oops!');
    });
  }

  changeColor(color): void {
    this.practiceInfoForm.patchValue({
      color: color
    });
    jQuery(document).trigger('refreshColorContrast');
  }

}
