import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { API_URL } from '../app.constants';
import {ApplicationRatingRequest, ChangePassword, ClearNewsRequest, EditProfile, User} from '../model';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(public http: HttpClient) {
  }
  find_by_id(): Observable<User> {
    return this.http.get<User>(`${API_URL}/v1/user`);
  }
  saveUserPicture(formData: FormData) {
    return this.http.post(`${API_URL}/v1/upload/user`, formData).pipe(map(
      (data: any) => data.image.file_name
    ));
  }
  changePassword(currentPassword: string, newPassword: string, confirmPassword: string) {
    const request = new ChangePassword(currentPassword, newPassword, confirmPassword);
    return this.http.post(`${API_URL}/v1/user/change_password`, request);
  }
  editProfile(user: any) {
    const request = new EditProfile(user.firstName, user.lastName, user.birthDate, user.country_id, user.city_id, user.address, user.email, user.phone, user.gender, user.currency_id, user.edited, user.currencies$);
    return this.http.put(`${API_URL}/v1/user/edit`, request);
  }
  getNews() {
    return this.http.get(`${API_URL}/v1/news`);
  }
  clearNews(newsId) {
    const request = new ClearNewsRequest(newsId);
    return this.http.put(`${API_URL}/v1/news/clear`, request);
  }
  updateApplicationRating(rating) {
    const request = new ApplicationRatingRequest(rating);
    return this.http.post(`${API_URL}/v1/application/rating`, request);
  }
}
