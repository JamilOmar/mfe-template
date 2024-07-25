import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import {
  catchError,
  firstValueFrom,
  Observable,
  switchMap,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private oidcSecurityService: OidcSecurityService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.oidcSecurityService.getAccessToken().pipe(
      switchMap((token) => {
        return Promise.all([
          token,
          firstValueFrom(this.oidcSecurityService.getPayloadFromAccessToken()),
        ]);
      }),
      switchMap(([token, payload]) => {
        if (token) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
        return next.handle(req).pipe(
          catchError((err) => {
            if (err.status === '401') {
              this.oidcSecurityService.authorize();
            }
            return throwError(err);
          })
        );
      })
    );
  }
}
