abstract class AbstractEntity {
  id: number;
  created: Date;
}

export class Currency extends AbstractEntity {
  name: string;
  symbol: string;
  symbol_native: string;
  code: string;
  name_plural: string;
  activated: boolean;
}

export class Country extends AbstractEntity {
  alpha3code: string;
  name: string;
  activated: boolean;
  phone_code: string;

}

export class City extends AbstractEntity {
  name: string;
  country: Country;

}

class Image {
  file_name: string;
}

class Role {
  role_name: string;
}

export class User extends AbstractEntity {
  activated: boolean;
  address: string;
  birth_date: Date;
  city: City;
  email: string;
  first_login: Date;
  first_name: string;
  gender: string;
  last_login: Date;
  last_name: string;
  phone: string;
  role: Role;
  role_id: number;
  country: Country;
  image: Image;
  categories: number;
  sub_categories: number;
  currencies: number;
  city_id: number;
  country_id: number;
  currency_id: number;
  application_rating: number;
}

export class BillCategory extends AbstractEntity{
  name: string;
  translations: string;
}

export class BillSubCategory extends BillCategory {
  bill_category: BillCategory;
}

export class Bill extends AbstractEntity {
  user: User;
  title: string;
  comment: string;
  price: number;
  image: number;//Image;
  bill_category: BillCategory;
  bill_sub_category: BillSubCategory;
  currency: string; Currency;
  quantity: number;
  not_my_city: boolean;
}

export interface Transaction {
  title: string;
  comment: string;
  price: number;
  image: number;//Image;
  bill_category: string;//BillCategory;
  bill_sub_category: string;//BillSubCategory;
}


export class AuthenticationRequest {
  email: string;
  password: string;
  code: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class SettingsCurrenciesGetRequest {
  active: boolean;
  search: string;

  constructor(active: boolean, search: string) {
    this.active = active;
    this.search = search;
  }
}

export class BillCostsGetRequest {
  categoryId: number;
  subCategoryId: number;
  currencyId: number;
  billsLimit: number;
  billsOffset: number;
  search: string;
  dateFrom: string;
  dateTo: string;

  constructor(categoryId: number, subCategoryId: number, currencyId: number, billsLimit: number, billsOffset: number, search: string, dateFrom: string, dateTo: string) {
    this.categoryId = categoryId;
    this.subCategoryId = subCategoryId;
    this.currencyId = currencyId;
    this.billsLimit = billsLimit;
    this.billsOffset = billsOffset;
    this.search = search;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
  }
}

export class NewBillRequest {
  categoryId: number;
  subCategoryId: number;
  currencyId: number;
  title: string;
  comment: string;
  price: string;
  quantity: number;
  notMyCity: boolean;
  created: string;

  constructor(categoryId: number, subCategoryId: number, currencyId: number, title: string, comment: string, price: string, quantity: number, notMyCity: boolean, created: string) {
    this.categoryId = categoryId;
    this.subCategoryId = subCategoryId;
    this.currencyId = currencyId;
    this.title = title;
    this.comment = comment;
    this.price = price;
    this.quantity = quantity;
    this.notMyCity = notMyCity;
    this.created = created;
  }
}

export class EditBillRequest {
  categoryId: number;
  subCategoryId: number;
  currencyId: number;
  title: string;
  comment: string;
  price: string;
  quantity: number;
  notMyCity: boolean;

  constructor(categoryId: number, subCategoryId: number, currencyId: number, title: string, comment: string, price: string, quantity: number, notMyCity: boolean) {
    this.categoryId = categoryId;
    this.subCategoryId = subCategoryId;
    this.currencyId = currencyId;
    this.title = title;
    this.comment = comment;
    this.price = price;
    this.quantity = quantity;
    this.notMyCity = notMyCity;
  }
}

export class reportPdfRequest {
  categoryId: number;
  subCategoryId: number;
  currencyId: number;
  billType: string;
  search: string;
  dateFrom: string;
  dateTo: string;

  constructor(categoryId: number, subCategoryId: number, currencyId: number, billType: string, search: string, dateFrom: string, dateTo: string) {
    this.categoryId = categoryId;
    this.subCategoryId = subCategoryId;
    this.currencyId = currencyId;
    this.billType = billType;
    this.search = search;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
  }
}

export class graphRequest {
  costs: boolean;
  profits: boolean;
  currency_id: number;
  dateFrom: string;
  dateTo: string

  constructor(costs: boolean, profits: boolean, currency_id: number, dateFrom: string, dateTo: string) {
    this.costs = costs;
    this.profits = profits;
    this.currency_id = currency_id;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
  }
}

export class graphResponse {
  bills: any[];
  min_cost: number;
  max_cost: number;
  min_profit: number;
  max_profit: number;
  monthly_limit: number;
  bill_categories_list_cost: any;
  bill_categories_list_profit: any;
  bill_sub_categories_list_cost: any;
  bill_sub_categories_list_profit: any;
  costs: number;
  profits: number;

  constructor(bills: any, min_cost: number, max_cost: number, min_profit: number, max_profit: number, monthly_limit: number, bill_categories_list_cost: any, bill_categories_list_profit: any, bill_sub_categories_list_cost: any, bill_sub_categories_list_profit: any, costs: number, profits: number) {
    this.bills = bills;
    this.min_cost = min_cost;
    this.max_cost = max_cost;
    this.min_profit = min_profit;
    this.max_profit = max_profit;
    this.monthly_limit = monthly_limit;
    this.bill_categories_list_cost = bill_categories_list_cost;
    this.bill_categories_list_profit = bill_categories_list_profit;
    this.bill_sub_categories_list_cost = bill_sub_categories_list_cost;
    this.bill_sub_categories_list_profit = bill_sub_categories_list_profit;
    this.costs = costs;
    this.profits = profits;
  }
}

export class SettingsCategoriesGetRequest {
  active: boolean;
  search: string;

  constructor(active: boolean, search: string) {
    this.active = active;
    this.search = search;
  }
}

export class SettingsSubCategoriesGetRequest {
  active: boolean;
  search: string;

  constructor(active: boolean, search: string) {
    this.active = active;
    this.search = search;
  }
}

export class SubCategoriesByCategoryGetRequest {
  category_id: number;

  constructor(category_id: number) {
    this.category_id = category_id;
  }
}

export class ActiveOrDeactiveUserSettingsCurrencyRequest extends SettingsCurrenciesGetRequest {
  currencyId: number;

  constructor(active: boolean, search: string, currencyId: number) {
    super(active, search);
    this.currencyId = currencyId;
  }
}

export class ActiveOrDeactiveUserSettingsCategoryRequest extends SettingsCategoriesGetRequest {
  categoryId: number;

  constructor(active: boolean, search: string, categoryId: number) {
    super(active, search);
    this.categoryId = categoryId;
  }
}

export class ActiveOrDeactiveUserSettingsSubCategoryRequest extends SettingsSubCategoriesGetRequest {
  subCategoryId: number;

  constructor(active: boolean, search: string, subCategoryId: number) {
    super(active, search);
    this.subCategoryId = subCategoryId;
  }
}

export class EditCurrencyMonthlyLimitRequest {
  currency_id: number;
  monthly_cost_limit: number

  constructor(currency_id: number, monthly_cost_limit: number) {
    this.currency_id = currency_id;
    this.monthly_cost_limit = monthly_cost_limit;
  }
}

export class RestartPasswordRequest {
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}

export class RestartPasswordCodeRequest extends  RestartPasswordRequest {
  code: string;

  constructor(code: string, email: string) {
    super(email);
    this.code = code;
  }
}


export class SaveNewPasswordRequest extends  RestartPasswordRequest {
  newPassword: string;
  confirmPassword: string;

  constructor(newPassword: string, confirmPassword: string, email: string) {
    super(email);
    this.newPassword = newPassword;
    this.confirmPassword = confirmPassword;
  }
}

export class ChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;

  constructor(currentPassword: string, newPassword: string, confirmPassword: string) {
    this.currentPassword = currentPassword;
    this.newPassword = newPassword;
    this.confirmPassword = confirmPassword;
  }
}

export class EditProfile {
  firstName: string;
  lastName: string;
  birthDate: string;
  country_id: number;
  city_id: number;
  address: string;
  email: string;
  phone: string;
  gender: string;
  currency_id: string;
  edited: boolean;
  currencies$: Currency[];

  constructor(firstName: string, lastName: string, birthDate: string, country_id: number, city_id: number, address: string, email: string, phone: string, gender: string, currency_id: string, edited: boolean, currencies$: Currency[]) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.country_id = country_id;
    this.city_id = city_id;
    this.address = address;
    this.email = email;
    this.phone = phone;
    this.gender = gender;
    this.currency_id = currency_id;
    this.edited = edited;
    this.currencies$ = currencies$
  }
}

export class ClearNewsRequest {
  newsId: number;

  constructor(newsId: number) {
    this.newsId = newsId;
  }
}

export class ApplicationRatingRequest {
  rating: number;

  constructor(rating: number) {
    this.rating = rating;
  }
}

export class RegisterRequest {
  address: string;
  birthDate: string;
  city_id: number;
  confirmPassword: string;
  email: string;
  firstName: string;
  gender: string;
  lastName: string;
  password: string;
  country_id: number;

  constructor(address:string, birthDate: string, city_id:number, confirmPassword:string, email:string, firstName:string, gender:string, lastName:string, password:string, country_id:number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.country_id = country_id;
    this.city_id = city_id;
    this.address = address;
    this.gender = gender;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.email = email;
  }
}
