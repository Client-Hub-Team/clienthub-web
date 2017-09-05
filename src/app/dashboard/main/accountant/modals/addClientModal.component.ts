import { Component, PACKAGE_ROOT_URL, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { AccountantService } from '../accountant.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormUtil } from '../../../../utils/formutils';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

  /* This is a component which we pass in modal*/
  @Component({
    selector: 'app-modal-add-client',
    templateUrl: './addClientModal.component.html'
  })
  export class AddClientModalComponent implements OnInit {
    public invited_to: any = null;
    public name: any = null;

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
          [Validators.required, Validators.email],
        ],
        company_name: [
          null,
          []
        ]
      });


    }

    inviteClient(): void {
      this.inviteFormSubmitAttempt = true;

      if (this.inviteForm.valid) {
        this.accountantService.invite_client(
          this.inviteForm.get('name').value,
          this.inviteForm.get('email').value,
          this.inviteForm.get('company_name').value,
          2,
          this.invited_to
        ).then((res) => {
          console.log(res.json());
          this.bsModalRef.hide();
          this.toastr.success(res.json().message, 'Success!');

          this.accountantService.get_clients().then((clientsRes) => {
            this.accountantService.clients.next({clients: clientsRes.json()});
          });
        }, (err) => {
          console.log(err);
          this.toastr.error('Error inviting client', 'Oops!');
        });
      }

      
    }

  }
