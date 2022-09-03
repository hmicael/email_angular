import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalConfirmComponent } from '../delete-modal-confirm/delete-modal-confirm.component';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  faTrash = faTrash;
  @Input() toBeDeletedEntityName!: string;
  @Output() canDelete: EventEmitter<boolean> = new EventEmitter();


  constructor(
    private _modalService: NgbModal
    ) {}

  ngOnInit(): void { }

  open() {
    const modalRef = this._modalService.open(DeleteModalConfirmComponent);
    modalRef.componentInstance.toBeDeletedEntityName = this.toBeDeletedEntityName;
    modalRef.result
      .then(
        () => this.canDelete.emit(true)
      )
      .catch(
        () => this.canDelete.emit(false)
      );
  }
}
