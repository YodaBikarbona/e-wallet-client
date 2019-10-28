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
    return this.http.post(`${API_URL}/v1/restartPassword`, request);
  }

  restartLoginCode(email: string) {
    const request = new RestartPasswordRequest(email);
    return this.http.post(`${API_URL}/v1/restartLoginCode`, request);
  }

  restartPasswordCode(code: string, email: string) {
    const request = new RestartPasswordCodeRequest(code, email);
    return this.http.post(`${API_URL}/v1/restartPasswordCode`, request);
  }

  saveNewPassword(newPassword: string, confirmPassword: string, email: string) {
    const request = new SaveNewPasswordRequest(newPassword, confirmPassword, email);
    return this.http.post(`${API_URL}/v1/saveNewPassword`, request);
  }
}

