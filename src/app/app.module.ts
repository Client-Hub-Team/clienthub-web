import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
import { DashboardModule } from './dashboard/dashboard.module';
import { AppRoutingModule } from './app-routing.module';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {ToastOptions} from 'ng2-toastr';

export class CustomOptions extends ToastOptions {
  // positionClass = 'toast-top-center';
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    LocalStorageModule.withConfig({
      prefix: 'clienthub',
      storageType: 'localStorage'
    }),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    RegistrationModule,
    DashboardModule,
    NgUploaderModule,
    BsDropdownModule.forRoot(),
    ToastModule.forRoot()
  ],
  providers: [
    LoginService,
    DashboardService,
    AuthGuard,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: ToastOptions, useClass: CustomOptions}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {  }
