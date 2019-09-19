import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BillCostsGetRequest, NewBillRequest, reportPdfRequest, SettingsCurrenciesGetRequest} from '../model';
import {API_URL} from '../app.constants';
import { saveAs } from 'file-saver';

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

  printBills(categoryId: number, subCategoryId: number, currencyId: number, billType: string) {
    const request = new reportPdfRequest(categoryId, subCategoryId, currencyId, billType);
    return this.http.post(`${API_URL}/report/print`, request, {responseType: 'blob'}).subscribe(
      (response) => {
        const blob = new Blob([response], {type: 'application/pdf'});
        saveAs(blob, 'report.pdf');
      },
      error => {
        // show your error message here
      }
    );
  }
}
