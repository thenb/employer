import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    BrowserModule,
    LoginRoutingModule,
    CoreModule,
  ],
  providers: [
  ]
})
export class LoginModule { }
