import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeleteModalConfirmComponent } from './components/delete-modal-confirm/delete-modal-confirm.component';


@NgModule({
  declarations: [
    ModalComponent,
    DeleteModalConfirmComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FontAwesomeModule
  ],
  exports: [ModalComponent],
  bootstrap: [ModalComponent]
})
export class SharedModule { }
