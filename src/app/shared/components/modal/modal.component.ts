import { Component, Input, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalConfirmComponent } from '../delete-modal-confirm/delete-modal-confirm.component';


const MODALS: {[name: string]: Type<any>} = {
  delete: DeleteModalConfirmComponent
};

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
      (click)="modal.close('Ok click')">Ok</button>`;

  @Input() faIcon?: IconDefinition;
  @Input() text?: string;
  @Input() targetLink!: string;
  @Input() modalAction!: string;
  @Input() toBeDeletedEntity!: string;


  constructor(
    private _modalService: NgbModal,
    private router: Router
    ) {}

  ngOnInit(): void { }

  open() {
    const modalRef = this._modalService.open(MODALS[this.modalAction]);
    modalRef.componentInstance.toBeDeletedEntity = this.toBeDeletedEntity;
    modalRef.result
      .then(
        () => (this.router.navigateByUrl(this.targetLink))
      )
      .catch(
        (error) => (console.log(error))
      );
  }
}
