import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPassowrdComponent } from './components/forgot-passowrd/forgot-passowrd.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/forgot-password', component: ForgotPassowrdComponent },
  { path: 'auth/reset-password/:token', component: ResetPasswordComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {}
