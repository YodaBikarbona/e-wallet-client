import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BillCostsGetRequest, EditBillRequest, graphRequest, NewBillRequest, reportPdfRequest, SettingsCurrenciesGetRequest} from '../model';
import {API_URL} from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  constructor(public http: HttpClient) { }
  getCosts(categoryId: number, subCategoryId: number, currencyId: number, billsLimit: number, billsOffset: number, search: string, dateFrom: string, dateTo: string, location: string) {
    const request = new BillCostsGetRequest(categoryId, subCategoryId, currencyId, billsLimit, billsOffset, search, dateFrom, dateTo, location);
    return this.http.post(`${API_URL}/v1/bills/costs`, request);
  }
  getProfits(categoryId: number, subCategoryId: number, currencyId: number, billsLimit: number, billsOffset: number, search: string, dateFrom: string, dateTo: string, location: string) {
    const request = new BillCostsGetRequest(categoryId, subCategoryId, currencyId, billsLimit, billsOffset, search, dateFrom, dateTo, location);
    return this.http.post(`${API_URL}/v1/bills/profits`, request);
  }
  newCosts(categoryId: number, subCategoryId: number, currencyId: number, title: string, comment: string, price: string, quantity: number, notMyCity: boolean, created: string) {
    const request = new NewBillRequest(categoryId, subCategoryId, currencyId, title, comment, price, quantity, notMyCity, created);
    return this.http.post(`${API_URL}/v1/bills/costs/new`, request);
  }
  newProfits(categoryId: number, subCategoryId: number, currencyId: number, title: string, comment: string, price: string, quantity: number, notMyCity: boolean, created: string) {
    const request = new NewBillRequest(categoryId, subCategoryId, currencyId, title, comment, price, quantity, notMyCity, created);
    return this.http.post(`${API_URL}/v1/bills/profits/new`, request);
  }

  printBills(categoryId: number, subCategoryId: number, currencyId: number, billType: string, search: string, dateFrom: string, dateTo: string, location: string) {
    const request = new reportPdfRequest(categoryId, subCategoryId, currencyId, billType, search, dateFrom, dateTo, location);
    return this.http.post(`${API_URL}/v1/report/print`, request, {responseType: 'blob'});
  }

  getGraph(costs: boolean, profits: boolean, currency_id: number, dateFrom: string, dateTo: string) {
    const request = new graphRequest(costs, profits, currency_id, dateFrom, dateTo);
    return this.http.post(`${API_URL}/v1/bills/graph`, request);
  }

  deleteBill(billId: number) {
    return this.http.delete(`${API_URL}/v1/bill/${billId}/delete`);
  }

  editBill(data: any) {
    const request = new EditBillRequest(data.categoryId, data.subCategoryId, data.currencyId, data.billTitle, data.billComment, data.billPrice, data.billQuantity, data.billNotMyCity);
    return this.http.post(`${API_URL}/v1/bill/${data.billId}/edit`, request);
  }
}
