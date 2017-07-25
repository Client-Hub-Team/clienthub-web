import { TestBed, async } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainDashboardComponent } from './dashboard/main/main.component';
import { TableauDashboardComponent } from './dashboard/tableau/tableau.component';
import { UploadDashboardComponent } from './dashboard/upload/upload.component';
import { AuthGuard } from './guards/auth.guard';
import { Routes, RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgUploaderModule } from 'ngx-uploader';
import { AppRoutingModule } from './app-routing.module';
import { LoginService } from './login/login.service';
import { DashboardService } from './dashboard/dashboard.service';
import { LocalStorageModule } from 'angular-2-local-storage';
import {APP_BASE_HREF} from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        NgUploaderModule,
        BsDropdownModule.forRoot(),
        LocalStorageModule.withConfig({
          prefix: 'clienthub',
          storageType: 'localStorage'
        }),
      ],
      declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        MainDashboardComponent,
        TableauDashboardComponent,
        UploadDashboardComponent
      ],
      providers: [LoginService, DashboardService, AuthGuard, {provide: APP_BASE_HREF, useValue : '/' }]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should create the LoginComponent', async(() => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should create the DashboardComponent', async(() => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should create the MainDashboardComponent', async(() => {
    const fixture = TestBed.createComponent(MainDashboardComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should create the TableauDashboardComponent', async(() => {
    const fixture = TestBed.createComponent(TableauDashboardComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should create the UploadDashboardComponent', async(() => {
    const fixture = TestBed.createComponent(UploadDashboardComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('app works!');
  // }));
});
