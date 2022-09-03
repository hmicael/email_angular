import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { NotAuthorizedComponent } from './core/components/errors/notauthorized/notauthorized.component';
import { PagenotfoundComponent } from './core/components/errors/pagenotfound/pagenotfound.component';
import { ServerErrorComponent } from './core/components/errors/servererror/servererror.component';

const routes: Routes = [
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), canActivate: [AuthGuard] },
  { path: '404-error', component: PagenotfoundComponent},
  { path: '500-error', component: ServerErrorComponent},
  { path: '403-error', component: NotAuthorizedComponent}
  // { path: '**', pathMatch: 'full', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
