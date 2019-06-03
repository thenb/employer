import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { Departure } from './departure.model';

@Injectable()
export class DepartureService {

    constructor(private http: HttpClient) { }

    getAllDepartures(): Observable<Departure[]> {
        return this.http.get<Departure[]>(environment.api_url + 'departures');
    }
}
