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
import {DialogShowBillComponent} from './show-bill.component';

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
  bills$: Bill[] = [];
  categoryId: number = null;
  subCategoryId: number = null;
  currencyId: number = null;
  newBillState: boolean = false;
  buttonSwitchMessage = 'Switch to profits!';
  billsLengthList = 0;
  billsLimit = 5;
  billsOffset = 0;
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
    this.getCosts(null, null, null, this.billsLimit, this.billsOffset);

  }

  getCosts(categoryId: number, subCategoryId: number, currencyId: number, billsLimit: number, billsOffset: number) {
    this.billService.getCosts(categoryId, subCategoryId, currencyId, this.billsLimit, this.billsOffset).subscribe((data:any) => {
      this.bills$ = data.costs;
      this.billsLengthList = data.costs_length_list;
    }, (data:any) => this.error_message = data.error.message);
  }

  getProfits(categoryId: number, subCategoryId: number, currencyId: number, billsLimit: number, billsOffset: number) {
    this.billService.getProfits(categoryId, subCategoryId, currencyId, this.billsLimit, this.billsOffset).subscribe((data:any) => {
      this.bills$ = data.profits;
      this.billsLengthList = data.costs_length_list;
    }, (data:any) => this.error_message = data.error.message);
  }

  /*onChange(categoryId: number, subCategoryId: number, currencyId: number) {
    this.getCosts(categoryId, subCategoryId, currencyId);
  }*/

  onChange(event, type: string) {
    if (type === 'categoryId') {
      this.categoryId = event.value;
      if (event.value != null) {
        this.settingsService.getSubCategoriesByCategories(event.value).subscribe((data: any) => {
          this.subCategories$ = data.sub_categories;
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
      this.getProfits(this.categoryId, this.subCategoryId, this.currencyId, this.billsLimit, this.billsOffset);
    }
    else {
      this.getCosts(this.categoryId, this.subCategoryId, this.currencyId, this.billsLimit, this.billsOffset);
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
        categoryId: 'null',
        subCategoryId: 'null',
        currencyId: 'null',
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
        if (this.buttonSwitchMessage === 'Switch to costs!') {
          this.getProfits(this.categoryId, this.subCategoryId, this.currencyId, this.billsLimit, this.billsOffset);
        }
        else {
          this.getCosts(this.categoryId, this.subCategoryId, this.currencyId, this.billsLimit, this.billsOffset);
        }
    });
  }

  openDialogShowBill(bill: any): void {
    let billType = '';
    if (this.buttonSwitchMessage === 'Switch to costs!') {
      billType = 'profits';
    }
    else {
      billType = 'costs';
    }
    const dialogRef = this.dialog.open(DialogShowBillComponent, {
      //width: '300px',
      disableClose: true,
      data: {
        billDate: bill.created,
        categoryId: bill.bill_category_id,
        subCategoryId: bill.bill_sub_category_id,
        currencyId: bill.currency_id,
        billTitle: bill.title,
        billComment: bill.comment,
        billPrice: bill.price,
        categories$: this.categories$,
        subCategories$: this.subCategories$,
        currencies$: this.currencies$,
        BillType: billType,
        billId: bill.id,
      }
    });

    dialogRef.afterClosed().pipe(
      map(((data: any) => data)))
      .subscribe(result => {
        if (this.buttonSwitchMessage === 'Switch to costs!') {
          this.getProfits(this.categoryId, this.subCategoryId, this.currencyId, this.billsLimit, this.billsOffset);
        }
        else {
          this.getCosts(this.categoryId, this.subCategoryId, this.currencyId, this.billsLimit, this.billsOffset);
        }
    });
  }

  changeBills(categoryId: number, subCategoryId: number, currencyId: number) {
    if (this.buttonSwitchMessage === 'Switch to costs!') {
      this.buttonSwitchMessage = 'Switch to profits!';
      this.getCosts(categoryId, subCategoryId, currencyId, this.billsLimit, this.billsOffset);
    }
    else {
      this.buttonSwitchMessage = 'Switch to costs!';
      this.getProfits(categoryId, subCategoryId, currencyId, this.billsLimit, this.billsOffset);
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
    this.billService.printBills(categoryId, subCategoryId, currencyId, billType);
  }

  newBillSubmit(categoryId: number, subCategoryId: number, currencyId: number, title: string, comment: string, price: string) {
    if (this.buttonSwitchMessage === 'Switch to costs!') {
      this.billService.newProfits(categoryId, subCategoryId, currencyId, title, comment, price).subscribe((data:any) => {
      }, (data:any) => this.error_message = data.error.message);
    }
    else {
      this.billService.newCosts(categoryId, subCategoryId, currencyId, title, comment, price).subscribe((data:any) => {
      }, (data:any) => this.error_message = data.error.message);
    }
  }

  changeOffsetLimit(event) {
    this.billsLimit = event.pageSize;
    this.billsOffset = event.pageIndex;
    if (this.buttonSwitchMessage === 'Switch to costs!') {
      this.getProfits(this.categoryId, this.subCategoryId, this.currencyId, this.billsLimit, this.billsOffset);
    }
    else {
      this.getCosts(this.categoryId, this.subCategoryId, this.currencyId, this.billsLimit, this.billsOffset);
    }
  }
}
