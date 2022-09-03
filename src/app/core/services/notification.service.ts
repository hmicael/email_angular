import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  options = {
    tapToDismiss: true,
    positionClass: "toast-top-right",
  };
  constructor(private toastr: ToastrService) { }

  showSuccess(message: string, title: string): void {
    this.toastr.success(message, title, this.options);
  }

  showError(message: string, title: string): void {
    this.toastr.error(message, title, this.options);
  }
}
