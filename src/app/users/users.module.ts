import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { UserComponent } from './components/user/user.component';
import { UsersRoutingModule } from './user-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserEditComponent } from './components/user-edit/user-edit.component';

@NgModule({
  declarations: [
    UserListComponent,
    NewUserComponent,
    UserComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FontAwesomeModule
  ]
})
export class UsersModule { }
