import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { retry, catchError, Observable, throwError } from 'rxjs';
import { ErrorBody } from '../models/error-body.model';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private notificationService: NotificationService
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(0),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // source code error
            errorMessage = error.error.message;
          } else {
            // server-side error
            errorMessage = error.message;
            switch (error.status) {
              case 400: {
                const errorBody: ErrorBody[] = error.error;
                for (const error of errorBody) {
                  this.notificationService.showError(error.message.replace(/"/gi, ""), 'Error');
                }
                break;
              }
              case 403: {
                const errorBody: ErrorBody = error.error;
                this.notificationService.showError(errorBody.message, 'Error');
                break;
              }
              case 404: {
                this.router.navigateByUrl('/404-error');
                break;
              }
              case 500: {
                this.notificationService.showError('A server internal error occured', 'Error');
                break;
              }
              default: {
                this.notificationService.showError(error.message, 'Error');
                break;
              }
            }
          }
          console.error(errorMessage);
          return throwError(() => new Error(errorMessage));
        })
     )
  }
}
