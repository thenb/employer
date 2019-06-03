import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { AuthenticationService } from './authentication.service';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = this.addJWTToken(req);
        return next.handle(req)
        .catch((e, c) => {
            if (e.status === 401 || e.status === 403) {
            this.authenticationService.logout();
            location.assign('/');
            console.log(e);
            return Observable.throw(e);
            }
            return Observable.throw(e);
        });
    }

    addJWTToken(req: HttpRequest<any>) {
        return req.clone({ headers: new HttpHeaders({
            'Access-Control-Allow-Origin': environment.client_url,
            'Authorization':  'Bearer ' + this.authenticationService.getToken()
        })});
    }
}
