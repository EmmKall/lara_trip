import { Component, inject, SimpleChanges } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AppServiceService } from '../services/AppService.service';
import { Country } from '../interfaces/Country';
import { City } from '../interfaces/City';
import { DataAppService } from '../services/dataApp.service';
import { WeatherServiceService } from '../services/weatherService.service';
import { RateService } from '../services/rate.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTabsModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
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

  summary: any = {
    country:  '',
    city:     '',
    temp:     0,
    temp_min: 0,
    temp_max: 0,
    rate:     0,
    total:    0,
    coin:     '',
  };
  langs: any = this._appService.getContent();
  lang: any  = {};

  weather: any = {};

  private gradeK: number = 273.15;

  constructor(){
  }

  ngOnInit(): void {
    this.langs = this._appService.getContent();
    this.lang  = this.langs[ 'es' ];
    this.countries = this._dataApp.getContries();
    this.cities    = this._dataApp.getCities();
  }

  ngOnChanges( changes: SimpleChanges ): void {
  }

  changeLang( lang: string ):void {
    this.lang = this.langs[ lang ];
  }

  updateCountry(): void {
    const country        = this.countries.filter( row => row.id === this.destinyForm.value.country )[ 0 ];
    const city           = this.cities.filter( row => row.id === this.destinyForm.value.city )[ 0 ];
    this.summary.country = country.country;
    this.summary.city    = city.city;
    this._weatherService.getWhater( city.lat, city.long ).subscribe( res => {
      this.summary.temp     = ( parseFloat( res.main.temp ) - this.gradeK ).toFixed( 2 );
      this.summary.temp_min = ( parseFloat( res.main.temp_min ) - this.gradeK ).toFixed( 2 );
      this.summary.temp_max = ( parseFloat( res.main.temp_max ) - this.gradeK ).toFixed( 2 );
      this.summary.coin = city.coin
    });

    this._rateService.getRate( 'COP' ).subscribe( res => {
      const { result } = res;
      if( result === 'success' ) {
        const { conversion_rates } = res;
        this.summary.rate  = parseFloat( conversion_rates[ city.currency ] );
        this.summary.total = ( this.summary.rate  * ( this.budgetForm.value.baget || 1 ) ).toFixed( 2 );
      } else {
        alert( 'Error al obtener el Tipo de cambio' );
      }

    });

  }

}
