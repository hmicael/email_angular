import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpResponseInterceptor } from './http-response.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi: true }
];
