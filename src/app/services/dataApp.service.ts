import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataAppService {

  private url = 'http://127.0.0.1:8000/api/';

  constructor( private _http: HttpClient ) {
  }

  getAllContries(): Observable<any> {
    const url = `${this.url}country`;
    return this._http.get<any>( url )
    .pipe(
      catchError( error => {
        return throwError( error )
      })
    );
  }

  getAllCities(): Observable<any>{
    const url = `${this.url}city`;
    return this._http.get<any>( url )
    .pipe(
      catchError( error => {
        return throwError( error )
      })
    );
  }

}
