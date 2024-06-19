import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  key       = '98701d2a663dc49dff228dcb';
  endpont   = `https://v6.exchangerate-api.com/v6/${this.key}/latest/`;

  headers = new HttpHeaders();

  constructor( private http: HttpClient ) {
    this.headers = new HttpHeaders({

    });
  }

  getRate( coin: string ): Observable<any> {
    const url = `${this.endpont}${coin}`;
    return this.http.get<any>( url )
    .pipe(
      catchError( error => {
        return throwError( error )
      })
    )
  }


}
