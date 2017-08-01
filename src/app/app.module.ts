import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainDashboardComponent } from './dashboard/main/main.component';
import { LoginService } from './login/login.service';
import { DashboardService } from './dashboard/dashboard.service';
import { RegistrationComponent } from './registration/registration.component';
import { CreateComponent } from './registration/create/create.component';
import { LocalStorageModule } from 'angular-2-local-storage';
import { AuthGuard } from './guards/auth.guard';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgUploaderModule } from 'ngx-uploader';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { RegistrationModule } from './registration/registration.module';

import { AppRoutingModule } from './app-routing.module';
import { SlickModule } from 'ngx-slick';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MainDashboardComponent
  ],
  imports: [
    LocalStorageModule.withConfig({
      prefix: 'clienthub',
      storageType: 'localStorage'
    }),
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    RegistrationModule,
    NgUploaderModule,
    BsDropdownModule.forRoot(),
    SlickModule.forRoot()
  ],
  providers: [LoginService, DashboardService, AuthGuard, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {  }
