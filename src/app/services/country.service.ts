import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {City, Country, RestartPasswordRequest} from '../model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../app.constants';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class CountryResolver implements Resolve<Country[]> {

  constructor(public http: HttpClient) { }

  resolve(): Observable<Country[]>  {
    return this.http.get<Country[]>(`${API_URL}/v1/countries`).pipe(map((res:any) => res.countries));
  }
}

@Injectable({ providedIn: "root" })
export class CityResolver implements Resolve<City[]> {

  constructor(public http: HttpClient) { }

  resolve(countryId): Observable<City[]> {
    return this.http.get<City[]>(`${API_URL}/v1/countries/${countryId}/cities`)//.pipe(map((res:any) => res.cities));
  }
}
