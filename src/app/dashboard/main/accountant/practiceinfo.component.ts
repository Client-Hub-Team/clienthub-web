import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { AccountantService } from './accountant.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormUtil } from '../../../utils/formutils';



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

  constructor(
    private localStorage: LocalStorageService,
    private accountantService: AccountantService,
    private formBuilder: FormBuilder
  ) {
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
          linkedin: this.company.linkedin
        }
      );

      this.practiceInfoForm.get('name').markAsTouched();
    });
  }

}
