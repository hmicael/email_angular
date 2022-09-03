import { LOCALE_ID, NgModule } from '@angular/core';
import * as fr from '@angular/common/locales/fr';
import { registerLocaleData, CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { httpInterceptorProviders } from './interceptors';
import { PagenotfoundComponent } from './components/errors/pagenotfound/pagenotfound.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ServerErrorComponent } from './components/errors/servererror/servererror.component';
import { NotAuthorizedComponent } from './components/errors/notauthorized/notauthorized.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PagenotfoundComponent,
    ServerErrorComponent,
    NotAuthorizedComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    httpInterceptorProviders
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
