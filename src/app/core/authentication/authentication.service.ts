import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import GoogleUser = gapi.auth2.GoogleUser;
import GoogleAuth = gapi.auth2.GoogleAuth;
import { GoogleAuthService } from 'ng-gapi';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class AuthenticationService {

    jwtHelper: JwtHelper = new JwtHelper();
    public isLoggedIn = new Subject<boolean>();
    public username = new Subject<string>();
    private googleAuth: gapi.auth2.GoogleAuth;

    constructor(
        private googleAuthService: GoogleAuthService,
        private router: Router
    ) {
        this.googleAuthService.getAuth().subscribe(
            (auth) => {
                this.googleAuth = auth;
            });
    }

    login(): Promise<boolean> {
        return this.googleAuth.signIn().then(res => {
            console.log(res);
            console.log(this.isLoggedIn);
            this.storeTokenClaims(res);
            this.isLoggedIn.next(true);
            this.username.next(res.getBasicProfile().getName());
            console.log(this.isLoggedIn);
            return true;
        });
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        this.googleAuth.signOut();
        this.googleAuth.disconnect();
        this.isLoggedIn.next(false);
    }

    isAuthenticated(): boolean {
        return tokenNotExpired();
    }

    getUsername() {
        return localStorage.getItem('username');
    }

    storeTokenClaims(gUser: gapi.auth2.GoogleUser): void {
        localStorage.setItem('token', gUser.getAuthResponse().id_token);
        localStorage.setItem('username', gUser.getBasicProfile().getName());
        localStorage.setItem('email', gUser.getBasicProfile().getEmail());
        const token = gUser.getAuthResponse().id_token;
    }

    getToken() {
        return localStorage.getItem('token');
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
