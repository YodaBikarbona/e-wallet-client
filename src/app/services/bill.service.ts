import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BillCostsGetRequest, NewBillRequest, SettingsCurrenciesGetRequest} from '../model';
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
  getProfits(categoryId: number, subCategoryId: number, currencyId: number) {
    const request = new BillCostsGetRequest(categoryId, subCategoryId, currencyId);
    return this.http.post(`${API_URL}/bills/profits`, request);
  }
  newCosts(categoryId: number, subCategoryId: number, currencyId: number, title: string, comment: string, price: string) {
    const request = new NewBillRequest(categoryId, subCategoryId, currencyId, title, comment, price);
    return this.http.post(`${API_URL}/bills/costs/new`, request);
  }
  newProfits(categoryId: number, subCategoryId: number, currencyId: number, title: string, comment: string, price: string) {
    const request = new NewBillRequest(categoryId, subCategoryId, currencyId, title, comment, price);
    return this.http.post(`${API_URL}/bills/profits/new`, request);
  }
}
