import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { retry, catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
     .pipe(
       retry(1),
       catchError((error: HttpErrorResponse) => {
         let errorMessage = '';
         if (error.error instanceof ErrorEvent) {
           // source code error
           errorMessage = error.error.message;
         } else {
           // server-side error
           console.log("client");
           errorMessage = error.message;
           switch (error.status) {
            case 404: {
              this.router.navigateByUrl('/404-error');
              break;
            }
            case 500: {
              this.router.navigateByUrl('/500-error');
              break;
            }
           }
         }
         console.log(errorMessage);
         return throwError(() => new Error(errorMessage));
       })
     )
  }
}
