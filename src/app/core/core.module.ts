import { LOCALE_ID, NgModule } from '@angular/core';
import * as fr from '@angular/common/locales/fr';
import { registerLocaleData, CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ]
})
export class CoreModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
