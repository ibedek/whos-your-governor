import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiBaseUriInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    let apiReq;
    if (req.url.indexOf('http') < 0 && req.url.indexOf('assets') < 0) {
      apiReq = req.clone({ url: `${environment.apiBaseUri}/${req.url}` });
    } else {
      apiReq = req.clone({ url: req.url });
    }

    return next.handle(apiReq);
  }
}
