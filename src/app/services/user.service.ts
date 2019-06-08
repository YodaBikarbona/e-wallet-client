import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { API_URL } from '../app.constants';
import { User } from '../model';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(public http: HttpClient) {
  }
  find_by_id(): Observable<User> {
    return this.http.get<User>(`${API_URL}/user`);
  }
  saveUserPicture(formData: FormData) {
    return this.http.post(`${API_URL}/upload/user`, formData).pipe(map(
      (data: any) => data.image.file_name
    ));
  }
}
