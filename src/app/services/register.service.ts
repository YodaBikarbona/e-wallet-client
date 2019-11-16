import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterRequest} from '../model';
import {API_URL} from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(public http: HttpClient) { }

  register(address:string, birthDate: string, city_id:number, confirmPassword:string, email:string, firstName:string, gender:string, lastName:string, password:string, country_id:number) {
    const request = new RegisterRequest(address, birthDate, city_id, confirmPassword, email, firstName, gender, lastName, password, country_id)
    return this.http.post(`${API_URL}/v1/register`, request, {headers: {'Lang': localStorage.getItem('lang')}});
  }
}
