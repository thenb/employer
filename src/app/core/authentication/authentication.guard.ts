import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private router: Router, private authenticationService: AuthenticationService) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        if (!this.authenticationService.isAuthenticated()) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}
