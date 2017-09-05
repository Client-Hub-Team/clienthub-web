import { Component, PACKAGE_ROOT_URL, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { AccountantService } from '../accountant.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormUtil } from '../../../../utils/formutils';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

  /* This is a component which we pass in modal*/
  @Component({
    selector: 'app-modal-add-accountant',
    templateUrl: './addAccountantModal.component.html'
  })
  export class AddAccountantModalComponent implements OnInit {
    public invited_to: any = null;
    public name: any = null;
    public pending_accountants: any = [];

    inviteForm: FormGroup;
    formUtil: FormUtil;
    inviteFormSubmitAttempt: boolean;

    constructor(
      public bsModalRef: BsModalRef,
      private accountantService: AccountantService,
      private formBuilder: FormBuilder,
      public toastr: ToastsManager,
    ) { }

    ngOnInit(): void {
      this.formUtil = new FormUtil();

      this.inviteForm = this.formBuilder.group({
        name: [
          null,
          [Validators.required],
        ],
        email: [
          null,
          [Validators.required],
        ]
      });


    }

    inviteClient(): void {
      this.inviteFormSubmitAttempt = true;

      this.accountantService.invite_client(
        this.inviteForm.get('name').value,
        this.inviteForm.get('email').value,
        this.name,
        1,
        this.invited_to
      ).then((res) => {
        this.pending_accountants.unshift(res.json().invite);
        this.bsModalRef.hide();
        this.toastr.success(res.json().message, 'Success!');
      }, (err) => {
        console.log(err);
        this.toastr.error('Error inviting accountant', 'Oops!');
      });
    }

  }
