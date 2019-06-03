import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { DepartureService } from '../app/shared/departure.service';
import { ArrivalService } from '../app/shared/arrival.service';

import {
  GoogleApiModule,
  GoogleApiService,
  GoogleAuthService,
  NgGapiClientConfig,
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from 'ng-gapi';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { LoginModule } from './login/login.module';
import { AuthenticationInterceptor } from './core/authentication/authentication.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';


//import { AppRoutingModule } from './app-routing.module';

const gapiClientConfig: NgGapiClientConfig = {
  client_id: environment.google_client_ID,
  discoveryDocs: ['https://analyticsreporting.googleapis.com/$discovery/rest?version=v4'],
  scope: [
      'profile',
      'email'
  ].join(' ')
};

const appRoutes: Routes = [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,    
    RouterModule.forRoot(appRoutes),
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
    LoginModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
    DepartureService,
    ArrivalService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
