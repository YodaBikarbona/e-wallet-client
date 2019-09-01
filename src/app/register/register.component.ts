import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {City, Country, RegisterRequest, SaveNewPasswordRequest} from '../model';
import {map} from 'rxjs/operators';
import {API_URL} from '../app.constants';
import {HttpClient} from '@angular/common/http';
import {RegisterService} from '../services/register.service';
import {CityResolver, CountryResolver} from '../services/country.service';
import {MatDateFormats} from '@angular/material';
import DateTimeFormat = Intl.DateTimeFormat;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  regRequest: RegisterRequest = new RegisterRequest();

  countries$: Observable<Country[]>;
  cities$: Observable<City[]>;
  constructor(public cityService: CityResolver, public router: ActivatedRoute, public registerService: RegisterService) { }

  ngOnInit() {
    this.countries$ = this.router.data.pipe(map(data => data.countries));
    console.log(this.countries$);
  }

  registerSubmit(regRequest: RegisterRequest) {
    let finalBirthDate = '';
    if (regRequest.birthDate) {
      /*let birthDateFormat = regRequest.birthDate.toLocaleDateString().replace("/","-");
      birthDateFormat = birthDateFormat.replace("/","-");
      birthDateFormat = birthDateFormat.split('-');
      finalBirthDate = finalBirthDate + birthDateFormat[2] + '-' + birthDateFormat[1] + '-' + birthDateFormat[0];
      console.log(finalBirthDate);
      regRequest.birthDate = finalBirthDate;*/
    }
    if (regRequest.password != regRequest.confirmPassword) {
    }
    else {
      this.registerService.register(regRequest).subscribe(console.log, console.log);
    }
  }


  onCountryChange(event) {
    const countryId = event.value;
    this.cityService.resolve(countryId).subscribe((data:any) => this.cities$ = data.cities);
  }

}
