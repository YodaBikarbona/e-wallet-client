import { Component, OnInit } from '@angular/core';
import {Transaction, Bill, Currency, BillCategory, BillSubCategory} from '../model';
import {SettingsService} from '../services/settings.service';
import {Router} from '@angular/router';
import {BillService} from '../services/bill.service';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {DialogChangePasswordComponent} from '../profile/change_password';
import {MatDialog} from '@angular/material';
import {DialogNewBillComponent} from './new-bill.component';
import {flatMap, map} from 'rxjs/operators';

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
  bills$: Bill[];
  categoryId: number = null;
  subCategoryId: number = null;
  currencyId: number = null;
  newBillState: boolean = false;
  buttonSwitchMessage = 'Switch to profits!'
  constructor(public billService: BillService, public settingsService: SettingsService, public router: Router, public dialog: MatDialog) { }

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
      this.bills$ = data.costs;
      console.log(this.bills$);
    }, (data:any) => this.error_message = data.error.message);
  }

  getProfits(categoryId: number, subCategoryId: number, currencyId: number) {
    this.billService.getProfits(categoryId, subCategoryId, currencyId).subscribe((data:any) => {
      this.bills$ = data.profits;
      console.log(this.bills$);
    }, (data:any) => this.error_message = data.error.message);
  }

  /*onChange(categoryId: number, subCategoryId: number, currencyId: number) {
    this.getCosts(categoryId, subCategoryId, currencyId);
  }*/

  onChange(event, type: string) {
    console.log("Tu sam");
    console.log(event.value)
    if (type === 'categoryId') {
      this.categoryId = event.value;
      if (event.value != null) {
        this.settingsService.getSubCategoriesByCategories(event.value).subscribe((data: any) => {
          this.subCategories$ = data.sub_categories;
          console.log(data)
          this.error_message = '';
        }, (data: any) => this.error_message = data.error.message);
      }
      else {
        this.subCategories$ = [];
      }

    }
    else if (type === 'subCategoryId') {
      this.subCategoryId = event.value;
    }
    else {
      this.currencyId = event.value;
    }
    if (this.buttonSwitchMessage === 'Switch to costs!') {
      this.getProfits(this.categoryId, this.subCategoryId, this.currencyId);
    }
    else {
      this.getCosts(this.categoryId, this.subCategoryId, this.currencyId);
    }
  }

  displayedColumns: string[] = ['title', 'comment', "bill_category", "bill_sub_category", "bill_price", "bill_currency", "image", "showDetails"];

   /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.bills$.map(t => t.price).reduce((acc, value) => acc + value, 0);
  }

  newBill(state: boolean) {
    //this.newBillState = state;
  }

  openDialogNewBill(): void {
    let billType = '';
    if (this.buttonSwitchMessage === 'Switch to costs!') {
      billType = 'profits';
    }
    else {
      billType = 'costs';
    }
    const dialogRef = this.dialog.open(DialogNewBillComponent, {
      //width: '300px',
      disableClose: true,
      data: {
        categories$: this.categories$,
        subCategories$: this.subCategories$,
        currencies$: this.currencies$,
        newBillType: billType,
        title: '',
        comment: '',
        price: null,
        categoryId: null,
        subCategoryId: null,
        currencyId: null,
      }
    });

    dialogRef.afterClosed().pipe(
    //   flatMap((result: any) => {
    //     if (this.buttonSwitchMessage === 'Switch to costs!') {
    //       this.getProfits(this.categoryId, this.subCategoryId, this.currencyId);
    //     }
    //     else {
    //       this.getCosts(this.categoryId, this.subCategoryId, this.currencyId);
    // }
    //   }),
      map(((data: any) => data)))
      .subscribe(result => {
        console.log('The dialog was closed');
        if (this.buttonSwitchMessage === 'Switch to costs!') {
          this.getProfits(this.categoryId, this.subCategoryId, this.currencyId);
        }
        else {
          this.getCosts(this.categoryId, this.subCategoryId, this.currencyId);
        }
    });
  }

  changeBills(categoryId: number, subCategoryId: number, currencyId: number) {
    if (this.buttonSwitchMessage === 'Switch to costs!') {
      this.buttonSwitchMessage = 'Switch to profits!';
      this.getCosts(categoryId, subCategoryId, currencyId);
    }
    else {
      this.buttonSwitchMessage = 'Switch to costs!';
      this.getProfits(categoryId, subCategoryId, currencyId);
    }
  }

  printReport(categoryId: number, subCategoryId: number, currencyId: number) {
    let billType = '';
    if (this.buttonSwitchMessage === 'Switch to costs!') {
      billType = 'profits';
    }
    else {
      billType = 'costs';
    }
    console.log(billType)
    this.billService.printBills(categoryId, subCategoryId, currencyId, billType);
  }

  newBillSubmit(categoryId: number, subCategoryId: number, currencyId: number, title: string, comment: string, price: string) {
    console.log(categoryId, subCategoryId, currencyId, title, comment, price);
    if (this.buttonSwitchMessage === 'Switch to costs!') {
      this.billService.newProfits(categoryId, subCategoryId, currencyId, title, comment, price).subscribe((data:any) => {
      }, (data:any) => this.error_message = data.error.message);
    }
    else {
      this.billService.newCosts(categoryId, subCategoryId, currencyId, title, comment, price).subscribe((data:any) => {
      }, (data:any) => this.error_message = data.error.message);
    }
    console.log(categoryId, subCategoryId, currencyId, title, comment, price);
  }

  testFun(event) {
    console.log(event);
  }
}
