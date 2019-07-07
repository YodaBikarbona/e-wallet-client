import { Component, OnInit } from '@angular/core';
import {Transaction, Bill, Currency, BillCategory, BillSubCategory} from '../model';
import {SettingsService} from '../services/settings.service';
import {Router} from '@angular/router';
import {BillService} from '../services/bill.service';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {

  currencies$: Currency[];
  categories$: BillCategory[];
  subCategories$: BillSubCategory[];
  error_message = '';
  costs$: Bill[];
  categoryId: number = null;
  subCategoryId: number = null;
  currencyId: number = null;
  newBillState: boolean = false;
  constructor(public billService: BillService, public settingsService: SettingsService, public router: Router) { }

  ngOnInit() {
    let currencies = (searchValues: string) => this.settingsService.getCurrencies(true, '');
    let categories = (searchValues: string) => this.settingsService.getCategories(true, '');
    //let subCategories = (searchValues: string) => this.settingsService.getSubCategories(true, '');
    currencies('').subscribe((data:any) => {
      this.currencies$ = data.currencies;
    }, (data:any) => this.error_message = data.error.message);
    categories('').subscribe((data:any) => {
      this.categories$ = data.categories;
    }, (data:any) => this.error_message = data.error.message);
    /*subCategories('').subscribe((data:any) => {
      this.subCategories$ = data.sub_categories;
    }, (data:any) => this.error_message = data.error.message);*/
    this.getCosts(null, null, null);
  }

  getCosts(categoryId: number, subCategoryId: number, currencyId: number) {
    this.billService.getCosts(categoryId, subCategoryId, currencyId).subscribe((data:any) => {
      this.costs$ = data.costs;
    }, (data:any) => this.error_message = data.error.message);
  }

  /*onChange(categoryId: number, subCategoryId: number, currencyId: number) {
    this.getCosts(categoryId, subCategoryId, currencyId);
  }*/

  onChange(id: number, type: string) {
    console.log("Tu sam")
    if (type === 'categoryId') {
      this.categoryId = id;
      //if (id != null) {
        this.settingsService.getSubCategoriesByCategories(id).subscribe((data: any) => {
          this.subCategories$ = data.sub_categories;
          console.log(data)
          this.error_message = '';
        }, (data: any) => this.error_message = data.error.message);
      //}
      //else {
        //this.subCategories$ = [];
      //}

    }
    else if (type === 'subCategoryId') {
      this.subCategoryId = id;
    }
    else {
      this.currencyId = id;
    }
    this.getCosts(this.categoryId, this.subCategoryId, this.currencyId);
  }

  displayedColumns: string[] = ['title', 'comment', "bill_category", "bill_sub_category", "image"];

   /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.costs$.map(t => t.price).reduce((acc, value) => acc + value, 0);
  }

  newBill(state: boolean) {
    this.newBillState = state;
  }

  newBillSubmit(category_id: number, sub_category_id: number, currency_id: number, title: string, comment: string, price: number) {
    console.log(category_id, sub_category_id, currency_id, title, comment, price);
  }

}
