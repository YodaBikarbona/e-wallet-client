import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BillCostsGetRequest, SettingsCurrenciesGetRequest} from '../model';
import {API_URL} from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  constructor(public http: HttpClient) { }
  getCosts(categoryId: number, subCategoryId: number, currencyId: number) {
    const request = new BillCostsGetRequest(categoryId, subCategoryId, currencyId);
    return this.http.post(`${API_URL}/bills/costs`, request);
  }
}
