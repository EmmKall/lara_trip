import { Component, inject, SimpleChanges } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { AppServiceService } from '../services/AppService.service';
import { Country } from '../interfaces/Country';
import { City } from '../interfaces/City';
import { DataAppService } from '../services/dataApp.service';
import { WeatherServiceService } from '../services/weatherService.service';
import { RateService } from '../services/rate.service';
import { CommonModule } from '@angular/common';
import { HelperService } from '../services/Helper.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTabsModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  private _formBuilder    = inject( FormBuilder );
  private _appService     = inject( AppServiceService );
  private _dataApp        = inject( DataAppService );
  private _weatherService = inject( WeatherServiceService );
  private _rateService    = inject( RateService );
  private _helper         = inject( HelperService );

  isLinear: boolean = false;

  destinyForm = this._formBuilder.group({
    country: [ 0, Validators.required],
    city:    [ 0, Validators.required],
  });
  budgetForm = this._formBuilder.group({
    baget: [ 0, Validators.required],
  });

  countries: Country[] = [];
  cities:    City[]    = [];
  request: any[]       = [];

  summary: any = {
    country_id: 0,
    country:   '',
    city_id:   0,
    city:      '',
    temp:      0,
    temp_min:  0,
    temp_max:  0,
    rate:      0,
    total:     0,
    coin:      '',
  };
  langs: any = this._appService.getContent();
  lang: any  = {};
  langMenu: Array<any> = [ { key: 'es', lang: 'Español' }, { key: 'gn', lang: 'Deutsch'} ];

  weather: any = {};

  private gradeK: number = 273.15;

  displayedColumns: string[] = [ 'date', 'country', 'coin', 'city', 'babget', 'temp', 'temp_min', 'temp_max', 'rate', 'total' ];
  dataSource = this.request;

  showList: boolean = true;

  constructor(){
  }

  ngOnInit(): void {
    this.langs = this._appService.getContent();
    this.lang  = this.langs[ 'es' ];

    this.getAllCountries();
    this.getAllCities();
    this.getLastRequest();
  }

  ngOnChanges( changes: SimpleChanges ): void {
  }

  getAllCountries():void {
    this._dataApp.getAllContries().subscribe( res => {
      const  { status } = res;
      if( status === 200 ){
        const { data } = res;
        this.countries = data;
      } else {
        this._helper.showMessage( 'top-end', 'error', 'Error al obtener paises', 2000 );
      }
    });
  }

  getAllCities(): void {
    this._dataApp.getAllCities().subscribe( res => {
      const { status } = res;
      if( status === 200 ){
        const { data } = res;
        this.cities = data;
      } else {
        this._helper.showMessage( 'top-end', 'error', 'Error al obtener ciudades', 2000 );
      }
    });
  }

  getLastRequest(): void {
    this._dataApp.getLastRequest().subscribe( res => {
      const { status } = res;
      if( status === 200 ){
        const { data } = res;
        this.request = data;
        this.dataSource = this.request;
      } else {
        this._helper.showMessage( 'top-end', 'error', 'Error al obtener últimas consultas', 2000 );
      }
    });
  }

  changeLang( e: any ):void {
    this.lang = this.langs[ e.target.value ];
  }

  chageShowList(): void {
    this.showList = !this.showList;
  }

  updateCountry(): void {
    const country           = this.countries.filter( row => row.id === this.destinyForm.value.country )[ 0 ];
    const city              = this.cities.filter( row => row.id === this.destinyForm.value.city )[ 0 ];
    this.summary.country_id = country.id;
    this.summary.country    = country.country;
    this.summary.city_id    = city.id;
    this.summary.city       = city.city;

    this._weatherService.getWhater( city.lat, city.long ).subscribe( res => {
      this.summary.temp     = ( parseFloat( res.main.temp ) - this.gradeK ).toFixed( 2 );
      this.summary.temp_min = ( parseFloat( res.main.temp_min ) - this.gradeK ).toFixed( 2 );
      this.summary.temp_max = ( parseFloat( res.main.temp_max ) - this.gradeK ).toFixed( 2 );
      this.summary.coin     = country.coin;
    });

  }

  updateRate(): void {
    this._rateService.getRate( 'COP' ).subscribe( res => {
      const { result } = res;
      if( result === 'success' ) {
        const country           = this.countries.filter( row => row.id === this.destinyForm.value.country )[ 0 ];
        const { conversion_rates } = res;
        this.summary.rate  = parseFloat( conversion_rates[ country.currency ] );
        this.summary.total = ( this.summary.rate  * ( this.budgetForm.value.baget || 1 ) ).toFixed( 2 );
        this.insertRequest();
      } else {
        this._helper.showMessage( 'top-end', 'error', 'Error al consultar tipo de cambio', 2000 );
      }
    });


  }

  insertRequest(): void {
    const data = {
      country_id: this.summary.country_id,
      city_id:    this.summary.city_id,
      babget:     this.budgetForm.value.baget,
      temp:       this.summary.temp,
      temp_min:   this.summary.temp_min,
      temp_max:   this.summary.temp_max,
      total:      this.summary.total,
      coin:       this.summary.coin,
    };

    this._dataApp.saverRequest( data ).subscribe( res => {
      const { status } = res;
      if( status === 200 ){
        this._helper.showMessage( 'top-end', 'success', 'Consulta guardada', 2000 );
        this.getLastRequest();
      } else {
        this._helper.showMessage( 'top-end', 'error', 'Error al guardar consultar', 2000 );
      }
    });

  }

}

//Endpoints
//Rate:    https://v6.exchangerate-api.com/v6/98701d2a663dc49dff228dcb/latest/COP
//Wheater: https://api.openweathermap.org/data/2.5/weather?lat=51.5282284&lon=-0.4133945&appid=12182d433914731335cbdfc689d6cd8f
//         https://app.exchangerate-api.com/dashboard
