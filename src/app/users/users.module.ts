import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { UserComponent } from './components/user/user.component';



@NgModule({
  declarations: [
    UserListComponent,
    NewUserComponent,
    UserComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsersModule { }
