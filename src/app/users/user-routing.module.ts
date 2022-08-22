import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewUserComponent } from './components/new-user/new-user.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'create', component: NewUserComponent },
  { path: ':id', component: UserComponent },
  { path: ':id/edit', component: UserEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
