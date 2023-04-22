import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import * as dotenv from "dotenv";
import { Observable, catchError, retry, throwError } from "rxjs";
import { Location } from "./location.model";

@Injectable({
  providedIn: "root",
})
export class WeatherService {
  rootUrl: string;
  q: string;
  private _key: string;

  constructor(private http: HttpClient) {
    this.rootUrl = process.env["WEATHER_API_BASEURL"]!.toString();
    this._key = process.env["WEATHER_API_KEY"]!.toString();
  }

  // getForecast(location: string, days: number): Observable {
  // return this.http.get(`${this.rootUrl}/forecast.json?key=${this._key}&aqi=no&alerts=no&q=${location}`);
  // }

  searchLocation(q: string): Observable<Location[]> {
    return this.http
      .get<Location[]>(`${this.rootUrl}/search.json?key=${this._key}&q=${q}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error("Something bad happened; please try again later."));
  }
}
