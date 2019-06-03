import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { NotificationService } from '../core/notifications/notification.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html'
})

export class LoginComponent {
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private zone: NgZone,
        private notificationService: NotificationService
    ) { }

    login() {
        this.authenticationService.login().then(res => {
            this.zone.run(() => this.router.navigate(['/']));
            
        })
        .catch(e => {
            console.error(e);
            if (e.error === 'popup_closed_by_user') {
                this.notificationService.showError('Error', 'Ha cerrado la ventana de inicio de sesion de Google');
            } else {
                this.notificationService.showError('Error', 'Ha ocurrido un error, intente nuevamente');
            }
        });
    }
}
