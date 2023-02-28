import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/authenticate', pathMatch: 'full' },
  { path: 'authenticate', component: AuthenticateComponent, pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
  { path: 'change-password/:token', component: ChangePasswordComponent },
  { path: 'reset-password', component: NewPasswordComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AppRoutingModule { }
