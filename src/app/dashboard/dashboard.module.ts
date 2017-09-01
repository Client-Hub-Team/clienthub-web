import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { LocalStorageModule } from 'angular-2-local-storage';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { ColorPickerModule } from 'ngx-color-picker';

// Components
import { LoginService } from '../login/login.service';
import { DashboardComponent } from './dashboard.component';
import { MainDashboardComponent } from './main/main.component';
import { AppsWidgetComponent } from './main/common/apps.component';
import { ResourcesWidgetComponent } from './main/common/resources.component';
import { AccountantViewComponent } from './main/accountant/accountant.component';
import { ClientViewComponent } from './main/client/client.component';
import { ClientlistWidgetComponent } from './main/accountant/clientlist.component';
import { PracticeinfoComponent } from './main/accountant/practiceinfo.component';
import { AppsPageComponent } from './main/accountant/apps-page.component';
import { ResourcesItemComponent } from './main/common/resources-item.component';

// Modals Components
import { AddClientModalComponent } from './main/accountant/modals/addClientModal.component';
import { AddAccountantModalComponent } from './main/accountant/modals/addAccountantModal.component';

// Services
import { DashboardService } from './dashboard.service';
import { AccountantService } from './main/accountant/accountant.service';

// Other imports
import { AuthGuard } from '../guards/auth.guard';
import { SlickModule } from 'ngx-slick';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
     { path: 'main', component: MainDashboardComponent },
     { path: 'practice-info', component: PracticeinfoComponent },
     { path: 'manage-apps', component: AppsPageComponent },
    ]
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    MainDashboardComponent,
    AppsWidgetComponent,
    ResourcesWidgetComponent,
    AccountantViewComponent,
    ClientViewComponent,
    ClientlistWidgetComponent,
    PracticeinfoComponent,
    AddClientModalComponent,
    AddAccountantModalComponent,
    AppsPageComponent,
    ResourcesItemComponent
  ],
  exports: [
    DashboardComponent,
    MainDashboardComponent,
    AppsWidgetComponent,
    ResourcesWidgetComponent,
    AccountantViewComponent,
    ClientViewComponent,
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
    RouterModule.forRoot(routes),
    SlickModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    DragulaModule,
    ColorPickerModule
  ],
  providers: [LoginService, DashboardService, AccountantService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  entryComponents: [AddClientModalComponent, AddAccountantModalComponent],
})
export class DashboardModule {  }
