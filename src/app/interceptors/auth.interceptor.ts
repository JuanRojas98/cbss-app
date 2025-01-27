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
import {AlertService} from "@shared/services/alert.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private authService: AuthService,
        private http: HttpClient,
        private alertService: AlertService
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const req = request.clone({
            setHeaders: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.authService.getAceessToken()}`
            }
        });

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    return this.authService.refreshToken().pipe(
                        switchMap((res: any) => {
                            this.authService.setAceessToken(res.accessToken);

                            const newReq = req.clone({
                                setHeaders: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${res.accessToken}`
                                }
                            });

                            return next.handle(newReq);
                        }),
                        catchError((err) => {
                            const finalError = new Error(err);

                            this.alertService.error('Su sesión ha caducado. Vuelva a iniciar sesión.');
                            this.authService.logout();

                            return throwError(() => err);
                        })
                    );
                }

                this.customAlertError(error.status, error.error.message);
                return throwError(() => error);
            })
        );
    }

    private customAlertError(status_code: number, messsage: string) {
        let error_message = '';

        switch (status_code) {
            case 404:
                error_message = ! messsage ? messsage : 'Se ha presentando un error en el sistema. Contáctese con el adminsitrador. <br> Código error: ' + status_code;
                break;
            case 500:
                error_message = 'Se ha presentando un error en el sistema. Contáctese con el adminsitrador. <br> Código error: ' + status_code;
                break;
            default:
                error_message = 'Se ha presentando un error en el sistema. Contáctese con el adminsitrador. <br> Código error: ' + status_code;
                break;
        }

        this.alertService.error(error_message);
    }
}
