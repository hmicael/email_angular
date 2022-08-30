import { Component, Input, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './delete-modal-confirm.component.html',
  styleUrls: ['./delete-modal-confirm.component.scss']
})
export class DeleteModalConfirmComponent implements OnInit {
  @Input() public toBeDeletedEntity!: string;

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void { }
}
