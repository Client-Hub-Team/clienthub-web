import { RegistrationModule } from './registration/registration.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { CreateComponent } from './registration/create/create.component';
import { AuthGuard } from './guards/auth.guard';
import { MainDashboardComponent } from './dashboard/main/main.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
     { path: 'main', component: MainDashboardComponent },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes), RegistrationModule ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
