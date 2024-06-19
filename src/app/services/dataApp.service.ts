import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataAppService {

  constructor() {
  }

  getContries(): any {
    return [
      {id: 1, country: 'Inglaterra'},
      {id: 2, country: 'Japón'},
      {id: 3, country: 'India'},
      {id: 4, country: 'Dinamarca'},
    ];
  }

  getCities(): any {
    return [
      {id: 1, country_id: 1, city: 'Londres', lat: 51.5282284, long: -0.4133945, currency: 'GBP', coin: '£' },
      {id: 2, country_id: 1, city: 'Mánchester', lat: 53.4722171, long: -2.3058624, currency: 'GBP' , coin: '£' },
      {id: 3, country_id: 2, city: 'Tokio', lat: 35.6678417, long: 139.4290522, currency: 'JPY' , coin: '¥' },
      {id: 4, country_id: 2, city: 'Osaka', lat: 34.6775704, long: 135.403637, currency: 'JPY' , coin: '¥' },
      {id: 5, country_id: 3, city: 'Nagpur', lat: 21.1610145, long: 78.916619, currency: 'INR' , coin: '₹' },
      {id: 6, country_id: 3, city: 'Maharastra', lat: 18.7511588, long: 71.7539815, currency: 'INR' , coin: '₹' },
      {id: 7, country_id: 4, city: 'Odense', lat: 55.3838512, long: 10.0860291, currency: 'DKK' , coin: 'kr' },
      {id: 8, country_id: 4, city: 'Kolding', lat: 55.4913742, long: 9.3207175, currency: 'DKK' , coin: 'kr' },
    ];
  }

}
