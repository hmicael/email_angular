import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeleteModalConfirmComponent } from './components/delete-modal-confirm/delete-modal-confirm.component';


@NgModule({
  declarations: [
    DeleteModalComponent,
    DeleteModalConfirmComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FontAwesomeModule
  ],
  exports: [DeleteModalComponent],
  bootstrap: [DeleteModalComponent]
})
export class SharedModule { }
