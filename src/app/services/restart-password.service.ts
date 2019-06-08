import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RestartPasswordCodeRequest, RestartPasswordRequest, SaveNewPasswordRequest} from '../model';
import {API_URL} from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class RestartPasswordService {

  constructor(public http: HttpClient) { }

  restartPassword(email: string) {
    const request = new RestartPasswordRequest(email);
    return this.http.post(`${API_URL}/restartPassword`, request);
  }

  restartPasswordCode(code: string, email: string) {
    const request = new RestartPasswordCodeRequest(code, email);
    return this.http.post(`${API_URL}/restartPasswordCode`, request);
  }

  saveNewPassword(password: string, confirmPassword: string, email: string) {
    const request = new SaveNewPasswordRequest(password, confirmPassword, email);
    return this.http.post(`${API_URL}/saveNewPassword`, request);
  }
}

