import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  key       = '12182d433914731335cbdfc689d6cd8f';
  endpont   = 'https://api.openweathermap.org/data/2.5/weather?';

  headers = new HttpHeaders();

constructor( private http: HttpClient ) {
  this.headers = new HttpHeaders({

  });
}

  getWhater( lat: number, long: number ): Observable<any> {
    const url = `${this.endpont}lat=${lat}&lon=${long}&appid=${this.key}`;
    return this.http.get<any>( url )
    .pipe(
      catchError( error => {
        return throwError( error )
      })
    )
  }

}
