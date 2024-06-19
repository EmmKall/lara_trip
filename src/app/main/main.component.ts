import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AppServiceService } from '../services/AppService.service';

interface Country {
  id: number;
  country: string;
}

interface City {
  id: number;
  country_id: number;
  city: string;
}

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

  private _formBuilder = inject( FormBuilder );
  private _appService  = inject( AppServiceService );

  isLinear: boolean = false;

  destinyForm = this._formBuilder.group({
    country: [ 0, Validators.required],
    city:    [ 0, Validators.required],
  });
  BudgetForm = this._formBuilder.group({
    baget: [ 0, Validators.required],
  });

  countries: Country[] = [
    {id: 1, country: 'country 01'},
    {id: 2, country: 'country 02'},
    {id: 3, country: 'country 03'},
  ];

  cities: City[] = [
    {id: 1, country_id: 1, city: 'city 01'},
    {id: 2, country_id: 1, city: 'city 02'},
    {id: 3, country_id: 2, city: 'city 03'},
    {id: 4, country_id: 2, city: 'city 04'},
    {id: 5, country_id: 3, city: 'city 05'},
    {id: 6, country_id: 3, city: 'city 06'},
  ];

  langs: any = this._appService.getContent();
  lang: any = {};

  constructor(){
  }

  ngOnInit(): void {
    this.langs = this._appService.getContent();
    this.lang  = this.langs[ 'es' ];
    console.log( this.lang );
  }

  changeLang( lang: string ):void {
    this.lang = this.langs[ lang ];
  }

}
