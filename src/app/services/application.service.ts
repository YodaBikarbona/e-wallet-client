import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { API_URL } from '../app.constants';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {AddBugRequest, AddSuggestionRequest} from '../model';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  constructor(public http: HttpClient) {
  }

  getBugs() {
    return this.http.get(`${API_URL}/v1/application/bugs`);
  }

  addBug(comment: string) {
    const request = new AddBugRequest(comment);
    return this.http.post(`${API_URL}/v1/application/bugs/add`, request);
  }

  addSuggestion(comment: string) {
    const request = new AddSuggestionRequest(comment);
    return this.http.post(`${API_URL}/v1/application/suggestions/add`, request);
  }
}
