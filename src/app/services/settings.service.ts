import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  ActiveOrDeactiveUserSettingsCategoryRequest,
  ActiveOrDeactiveUserSettingsCurrencyRequest, ActiveOrDeactiveUserSettingsSubCategoryRequest, EditCurrencyMonthlyLimitRequest,
  SettingsCategoriesGetRequest,
  SettingsCurrenciesGetRequest,
  SettingsSubCategoriesGetRequest, SubCategoriesByCategoryGetRequest
} from '../model';
import {API_URL} from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(public http: HttpClient) { }

  getCurrencies(active: boolean, search: string) {
    const request = new SettingsCurrenciesGetRequest(active, search);
    return this.http.post(`${API_URL}/v1/user/currencies`, request);
  }
  getActiveCurrenciesLimit(active = true, search: string) {
    const request = new SettingsCurrenciesGetRequest(active, search);
    return this.http.post(`${API_URL}/v1/active/currencies/limit`, request);
  }
  editActiveCurrenciesLimit(currency_id: number, monthly_cost_limit: number) {
    const request = new EditCurrencyMonthlyLimitRequest(currency_id, monthly_cost_limit);
    return this.http.put(`${API_URL}/v1/currency/limit/edit`, request);
  }
  ToogleActiveCurrency(active: boolean, search: string, currencyId: number) {
    const request = new ActiveOrDeactiveUserSettingsCurrencyRequest(active, search, currencyId);
    return this.http.post(`${API_URL}/v1/user/save_currency`, request);
  }
  getCategories(active: boolean, search: string) {
    const request = new SettingsCategoriesGetRequest(active, search);
    return this.http.post(`${API_URL}/v1/user/categories`, request);
  }
  ToogleActiveCategory(active: boolean, search: string, categoryId: number) {
    const request = new ActiveOrDeactiveUserSettingsCategoryRequest(active, search, categoryId);
    return this.http.post(`${API_URL}/v1/user/save_category`, request);
  }
  getSubCategories(active: boolean, search: string) {
    const request = new SettingsSubCategoriesGetRequest(active, search);
    return this.http.post(`${API_URL}/v1/user/sub_categories`, request);
  }
  ToogleActiveSubCategory(active: boolean, search: string, subCategoryId: number) {
    const request = new ActiveOrDeactiveUserSettingsSubCategoryRequest(active, search, subCategoryId);
    return this.http.post(`${API_URL}/v1/user/save_sub_category`, request);
  }
  getSubCategoriesByCategories(category_id: number) {
    const request = new SubCategoriesByCategoryGetRequest(category_id);
    return this.http.post(`${API_URL}/v1/user/category/sub_categories`, request);
  }
}
