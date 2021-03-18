import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('Hello from interceptor!');
    const headerReq = request.clone({
      headers: request.headers
        .set('Content-Type', 'application/json')
        .set('Authorization', 'my-auth-token'),
    });
    console.log(headerReq);
    return next.handle(headerReq);
  }
}
