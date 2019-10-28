import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BillCostsGetRequest, graphRequest, NewBillRequest, reportPdfRequest, SettingsCurrenciesGetRequest} from '../model';
import {API_URL} from '../app.constants';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  constructor(public http: HttpClient) { }
  getCosts(categoryId: number, subCategoryId: number, currencyId: number, billsLimit: number, billsOffset: number) {
    const request = new BillCostsGetRequest(categoryId, subCategoryId, currencyId, billsLimit, billsOffset);
    return this.http.post(`${API_URL}/v1/bills/costs`, request);
  }
  getProfits(categoryId: number, subCategoryId: number, currencyId: number, billsLimit: number, billsOffset: number) {
    const request = new BillCostsGetRequest(categoryId, subCategoryId, currencyId, billsLimit, billsOffset);
    return this.http.post(`${API_URL}/v1/bills/profits`, request);
  }
  newCosts(categoryId: number, subCategoryId: number, currencyId: number, title: string, comment: string, price: string, quantity: number, notMyCity: boolean) {
    const request = new NewBillRequest(categoryId, subCategoryId, currencyId, title, comment, price, quantity, notMyCity);
    return this.http.post(`${API_URL}/v1/bills/costs/new`, request);
  }
  newProfits(categoryId: number, subCategoryId: number, currencyId: number, title: string, comment: string, price: string, quantity: number, notMyCity: boolean) {
    const request = new NewBillRequest(categoryId, subCategoryId, currencyId, title, comment, price, quantity, notMyCity);
    return this.http.post(`${API_URL}/v1/bills/profits/new`, request);
  }

  printBills(categoryId: number, subCategoryId: number, currencyId: number, billType: string) {
    const request = new reportPdfRequest(categoryId, subCategoryId, currencyId, billType);
    return this.http.post(`${API_URL}/v1/report/print`, request, {responseType: 'blob'}).subscribe(
      (response) => {
        const blob = new Blob([response], {type: 'application/pdf'});
        saveAs(blob, 'report.pdf');
      },
      error => {
        // show your error message here
      }
    );
  }

  getGraph(costs: boolean, profits: boolean, currency_id: number) {
    const request = new graphRequest(costs, profits, currency_id);
    return this.http.post(`${API_URL}/v1/bills/graph`, request);
  }

  deleteBill(billId: number) {
    return this.http.delete(`${API_URL}/v1/bill/${billId}/delete`);
  }
}
