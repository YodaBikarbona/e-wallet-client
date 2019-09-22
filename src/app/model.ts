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
}

export class BillCategory extends AbstractEntity{
  name: string;
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

  constructor(categoryId: number, subCategoryId: number, currencyId: number) {
    this.categoryId = categoryId;
    this.subCategoryId = subCategoryId;
    this.currencyId = currencyId;
  }
}

export class NewBillRequest {
  categoryId: number;
  subCategoryId: number;
  currencyId: number;
  title: string;
  comment: string;
  price: string;

  constructor(categoryId: number, subCategoryId: number, currencyId: number, title: string, comment: string, price: string) {
    this.categoryId = categoryId;
    this.subCategoryId = subCategoryId;
    this.currencyId = currencyId;
    this.title = title;
    this.comment = comment;
    this.price = price;
  }
}

export class reportPdfRequest {
  categoryId: number;
  subCategoryId: number;
  currencyId: number;
  billType: string;

  constructor(categoryId: number, subCategoryId: number, currencyId: number, billType: string) {
    this.categoryId = categoryId;
    this.subCategoryId = subCategoryId;
    this.currencyId = currencyId;
    this.billType = billType;
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
  password: string;
  confirmPassword: string;

  constructor(password: string, confirmPassword: string, email: string) {
    super(email);
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
}

export class ChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;

  constructor(currentPassword: string, newPassword: string, confirmPassword: string) {
    this.currentPassword = currentPassword
    this.newPassword = newPassword
    this.confirmPassword = confirmPassword
  }
}

export class RegisterRequest {
  address:string;
  birthDate:string;
  city_id:number;
  confirmPassword:string;
  email:string;
  firstName:string;
  gender:string;
  lastName:string;
  password:string;
  country_id:number;

  /*constructor(address:string, birthDate:string, city_id:number, confirmPassword:string, email:string, firstName:string, gender:string, lastName:string, password:string, country_id:number) {
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
  }*/
}
