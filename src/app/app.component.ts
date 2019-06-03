import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './core/authentication/authentication.service';
import { PwaService } from './core/pwa/pwa.service';
import { Subscription } from 'rxjs/Subscription';

import { ArrivalService } from './shared/arrival.service';
import { DepartureService } from './shared/departure.service';
import { Arrival } from './shared/arrival.model';
import { Departure } from './shared/departure.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  isAuthenticated: boolean;
  username: string;
  subscription: Subscription;

  arrivals: Arrival[] = [];
  departures: Departure[] = [];
  
  constructor(
    private authenticationService: AuthenticationService,
    private arrivalService: ArrivalService,
    private departureService: DepartureService,
    private router: Router,
    private zone: NgZone,
    private pwa :PwaService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authenticationService.isLoggedIn.subscribe(
      (isLoggedIn) => {
        console.log(isLoggedIn);
        this.isAuthenticated = isLoggedIn;
        this.zone.run(() => this.router.navigate(['/']));
      }
    );
    this.isAuthenticated = this.authenticationService.isAuthenticated();
    this.subscription = this.authenticationService.username.subscribe(
      (username) => {
        this.username = username;
      }
    );
    this.username = this.authenticationService.getUsername();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  login() {
    this.authenticationService.login().then(res => {
        this.router.navigate(['/']);
    })
    .catch(e => {
        console.error(e);
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  arrival() {
    this.arrivalService.getAllArrival().subscribe(
      result => {
          this.arrivals = result;  
          console.log(this.arrivals)         
      },
      error => {
          console.error('getAllArrival error', error);          
      });
  }

  departure() {
    this.departureService.getAllDepartures().subscribe(
      result => {
          this.departures = result;    
          console.log(this.departures)      
      },
      error => {
          console.error('getAllDepartures error', error);
      });
  }

  installPwa(): void {
    this.pwa.promptEvent.prompt();
  }

  
        




}
