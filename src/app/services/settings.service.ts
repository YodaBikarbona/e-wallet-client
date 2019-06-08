import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  ActiveOrDeactiveUserSettingsCategoryRequest,
  ActiveOrDeactiveUserSettingsCurrencyRequest, ActiveOrDeactiveUserSettingsSubCategoryRequest,
  SettingsCategoriesGetRequest,
  SettingsCurrenciesGetRequest,
  SettingsSubCategoriesGetRequest
} from '../model';
import {API_URL} from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(public http: HttpClient) { }

  getCurrencies(active: boolean, search: string) {
    const request = new SettingsCurrenciesGetRequest(active, search);
    return this.http.post(`${API_URL}/user/currencies`, request);
  }
  ToogleActiveCurrency(active: boolean, search: string, currencyId: number) {
    const request = new ActiveOrDeactiveUserSettingsCurrencyRequest(active, search, currencyId);
    return this.http.post(`${API_URL}/user/save_currency`, request);
  }
  getCategories(active: boolean, search: string) {
    const request = new SettingsCategoriesGetRequest(active, search);
    return this.http.post(`${API_URL}/user/categories`, request);
  }
  ToogleActiveCategory(active: boolean, search: string, categoryId: number) {
    const request = new ActiveOrDeactiveUserSettingsCategoryRequest(active, search, categoryId);
    return this.http.post(`${API_URL}/user/save_category`, request);
  }
  getSubCategories(active: boolean, search: string) {
    const request = new SettingsSubCategoriesGetRequest(active, search);
    return this.http.post(`${API_URL}/user/sub_categories`, request);
  }
  ToogleActiveSubCategory(active: boolean, search: string, subCategoryId: number) {
    const request = new ActiveOrDeactiveUserSettingsSubCategoryRequest(active, search, subCategoryId);
    return this.http.post(`${API_URL}/user/save_sub_category`, request);
  }
}
