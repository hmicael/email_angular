import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserComponent } from './components/user/user.component';
import { UsersRoutingModule } from './user-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UserListComponent,
    UserComponent,
    UserFormComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UsersModule { }
