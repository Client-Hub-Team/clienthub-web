import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
   
  /* This is a component which we pass in modal*/
   
  @Component({
    selector: 'modal-content',
    templateUrl: './addClientModal.component.html'
  })
  export class AddClientModalComponent {
    public title: string;
    public list: any[] = [];
    constructor(public bsModalRef: BsModalRef) {}
  }