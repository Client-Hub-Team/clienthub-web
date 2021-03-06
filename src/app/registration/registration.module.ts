import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration.component';
import { MainRegistrationComponent } from './main/main.component';
import { CreateComponent } from './create/create.component';
import { LocalStorageModule } from 'angular-2-local-storage';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgUploaderModule } from 'ngx-uploader';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CreateService } from './create/create.service';
import { LoginService } from '../login/login.service';
import { RegistrationService } from './registration.service';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent,
    children: [
     { path: 'create', component: CreateComponent },
     { path: 'select', component: MainRegistrationComponent },
    ]
  },
];

@NgModule({
  declarations: [
    RegistrationComponent,
    CreateComponent,
    MainRegistrationComponent
  ],
  exports: [
    RegistrationComponent,
    CreateComponent
  ],
  imports: [
    LocalStorageModule.withConfig({
      prefix: 'clienthub',
      storageType: 'localStorage'
    }),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    TooltipModule.forRoot(),
    RouterModule.forRoot(routes),
  ],
  providers: [CreateService, LoginService, RegistrationService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class RegistrationModule {  }
