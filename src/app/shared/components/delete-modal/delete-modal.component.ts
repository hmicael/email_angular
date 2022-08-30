import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { DeleteModalConfirmComponent } from '../delete-modal-confirm/delete-modal-confirm.component';
import { tap } from 'rxjs';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  apiUrl = environment.apiURL;
  faTrash = faTrash;
  @Input() modalAction!: string;
  @Input() toBeDeletedEntity!: string;
  @Input() toBeDeletedId!: number;
  @Input() toBeDeletedEntityName!: string;


  constructor(
    private _modalService: NgbModal,
    private http: HttpClient
    ) {}

  ngOnInit(): void { }

  open() {
    const modalRef = this._modalService.open(DeleteModalConfirmComponent);
    modalRef.componentInstance.toBeDeletedEntityName = this.toBeDeletedEntityName;
    modalRef.result
      .then(
        () => {
          this.http.delete(`${this.apiUrl}/${this.toBeDeletedEntity}/${this.toBeDeletedId}`)
          .pipe(
            tap(() => window.location.reload())
          )
          .subscribe()
        }
      )
      .catch(
        (error) => (console.log(error))
      );
  }
}
