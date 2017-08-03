import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { LocalStorageModule } from 'angular-2-local-storage';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

// Components
import { LoginService } from '../login/login.service';
import { DashboardComponent } from './dashboard.component';
import { MainDashboardComponent } from './main/main.component';
import { AppsWidgetComponent } from './main/apps.component';
import { ResourcesWidgetComponent } from './main/resources.component';
import { AccountantViewComponent } from './main/accountant.component';
import { ClientViewComponent } from './main/client.component';
import { UserlistWidgetComponent } from './main/userlist.component';

// Services
import { DashboardService } from './dashboard.service';
import { AccountantService } from './main/accountant.service';

// Other imports
import { AuthGuard } from '../guards/auth.guard';
import { SlickModule } from 'ngx-slick';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
     { path: 'main', component: MainDashboardComponent },
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
    UserlistWidgetComponent
  ],
  exports: [
    DashboardComponent,
    MainDashboardComponent,
    AppsWidgetComponent,
    ResourcesWidgetComponent,
    AccountantViewComponent,
    ClientViewComponent
  ],
  imports: [
    LocalStorageModule.withConfig({
      prefix: 'clienthub',
      storageType: 'localStorage'
    }),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    SlickModule.forRoot()
  ],
  providers: [LoginService, DashboardService, AccountantService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class DashboardModule {  }
