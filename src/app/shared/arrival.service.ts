import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { Arrival } from './arrival.model';

@Injectable()
export class ArrivalService {

    constructor(private http: HttpClient) { }

    getAllArrival(): Observable<Arrival[]> {
        return this.http.get<Arrival[]>(environment.api_url + 'arrivals');
    }
}
