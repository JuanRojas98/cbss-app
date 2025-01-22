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

    // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //     const accessToken = this.authService.getAceessToken();
    //
    //     if ( accessToken ) {
    //         const req = request.clone({
    //             setHeaders: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${this.authService.getAceessToken()}`
    //             }
    //         });
    //
    //         return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
    //             if (( err.status === 401 || err.status === 403 ) && !this.refresh) {
    //                 this.refresh = true;
    //                 const refreshToken = this.authService.getRefreshToken();
    //
    //                 return this.http.post('/users/refresh',
    //                     {
    //                         token: refreshToken
    //                     }
    //                 ).pipe(
    //                     switchMap((res: any) => {
    //                         const newAccessToken = res.accessToken;
    //                         this.authService.setAceessToken(newAccessToken);
    //
    //                         return next.handle(request.clone({
    //                             setHeaders: {
    //                                 Accept: 'application/json',
    //                                 'Content-Type': 'application/json',
    //                                 Authorization: `Bearer ${newAccessToken}`
    //                             }
    //                         }));
    //                     }),
    //                     catchError((error) => {
    //                         this.refresh = false;
    //                         this.authService.logout();
    //
    //                         return throwError(() => error);
    //                     })
    //                 ) as Observable<HttpEvent<any>>;
    //             }
    //
    //             this.refresh = false;
    //             return throwError(() => err);
    //         }));
    //     }
    //
    //     return next.handle(request);
    // }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const req = request.clone({
            setHeaders: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.authService.getAceessToken()}`
            }
        });

        return next.handle(req).pipe(
            catchError((error) => {
                if (
                    error instanceof HttpErrorResponse &&
                    !req.url.includes('users/login') &&
                    error.status === 401
                ) {
                    return this.handle401Error(req, next);
                }

                return throwError(() => error);
            })
        );
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.refresh) {
            this.refresh = true;

            if (this.authService.getAceessToken()) {
                return this.authService.refreshToken().pipe(
                    switchMap((res: any) => {
                        const newAccessToken = res.accessToken;
                        this.authService.setAceessToken(newAccessToken);
                        this.refresh = false;

                        return next.handle(request);
                    }),
                    catchError((error) => {
                        this.refresh = false;

                        if (error.status == '403') {
                            this.authService.logout();
                        }

                        return throwError(() => error);
                    })
                );
            }
        }

        return next.handle(request);
    }
}
