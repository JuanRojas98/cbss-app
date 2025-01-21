import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpClient
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {AuthService} from "@services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    refresh = false;

    constructor(
        private router: Router,
        private authService: AuthService,
        private http: HttpClient
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const accessToken = this.authService.getAceessToken();

        if ( accessToken ) {
            const req = request.clone({
                setHeaders: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.authService.getAceessToken()}`
                }
            });

            return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
                if (err.status === 403 && !this.refresh) {
                    this.refresh = true;
                    const refreshToken = this.authService.getRefreshToken();

                    return this.http.post('/refresh',
                        {
                            token: refreshToken
                        }
                    ).pipe(
                        switchMap((res: any) => {
                            const newAccessToken = res.accessToken;
                            this.authService.setAceessToken(newAccessToken);

                            return next.handle(request.clone({
                                setHeaders: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${newAccessToken}`
                                }
                            }));
                        })
                    ) as Observable<HttpEvent<any>>;
                }

                this.refresh = false;
                return throwError(() => err);
            }));
        }

        return next.handle(request);
    }
}
