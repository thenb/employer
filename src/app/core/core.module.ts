import { NgModule } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { PwaService } from './pwa/pwa.service';
import { ToastrModule } from 'ngx-toastr';
import { NotificationService } from './notifications/notification.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  declarations: [
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
    NotificationService,
    PwaService
  ],
  exports: [
  ]
})
export class CoreModule { }
