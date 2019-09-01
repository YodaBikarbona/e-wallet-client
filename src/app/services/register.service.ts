import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterRequest} from '../model';
import {API_URL} from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(public http: HttpClient) { }

  register(regRequest: RegisterRequest) {
    return this.http.post(`${API_URL}/register`, regRequest);
  }
}
