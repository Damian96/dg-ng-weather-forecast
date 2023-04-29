import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as dotenv from 'dotenv'; // required for process.env
import { Observable, BehaviorSubject, catchError, retry, throwError } from 'rxjs';
import { ForecastResponse, Location } from './weatherservice.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  rootUrl: string;
  q: string;
  private _key: string;
  lastLocation$: BehaviorSubject<Location>;
  selectedLocation$: Observable<any>;

  constructor(private http: HttpClient) {
    this.rootUrl = process.env['WEATHER_API_BASEURL']!.toString();
    this._key = process.env['WEATHER_API_KEY']!.toString();
    this.lastLocation$ = new BehaviorSubject<Location>({
      "id": 2862396,
      "name": "Athens",
      "region": "Attica",
      "country": "Greece",
      "lat": 37.98,
      "lon": 23.72,
      "url": "athens-attica-greece"
    },);
    this.selectedLocation$ = this.lastLocation$.asObservable();
  }

  getForecastObject(location: Location, days: number): Observable<ForecastResponse> {
    return this.http
      .get<ForecastResponse>(
        `${this.rootUrl}/forecast.json?key=${this._key}&aqi=no&alerts=no&q=${location.lat + ',' + location.lon
        }`
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  searchLocation(q: string): Observable<Location[]> {
    return this.http
      .get<Location[]>(`${this.rootUrl}/search.json?key=${this._key}&q=${q}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  addSelectedLocation(loc: Location) {
    if (this.lastLocation$) {
      this.lastLocation$.next(loc);
    }
  }
}
