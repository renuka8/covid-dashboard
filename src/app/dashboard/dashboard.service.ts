import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable()
export class DashboardService {
  constructor(private http: HttpClient) { }


  configUrl = 'https://data.covid19india.org/v4/min/timeseries.min.json';

getConfig() {
  return this.http.get(this.configUrl);
}
}