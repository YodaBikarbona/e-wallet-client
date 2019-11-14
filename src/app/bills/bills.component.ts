import { Component, OnInit } from '@angular/core';
import {Transaction, Bill, Currency, BillCategory, BillSubCategory} from '../model';
import {SettingsService} from '../services/settings.service';
import {Router} from '@angular/router';
import {BillService} from '../services/bill.service';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {DialogChangePasswordComponent} from '../profile/change_password';
import {MatDialog, MatSnackBar} from '@angular/material';
import {DialogNewBillComponent} from './new-bill.component';
import {debounceTime, flatMap, map} from 'rxjs/operators';
import {DialogShowBillComponent} from './show-bill.component';
import {FormControl} from '@angular/forms';
import {Subscription, zip} from 'rxjs';
import { saveAs } from 'file-saver';
import {languages, translateFunction} from '../translations/translations';

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
  searchField = new FormControl('');
  subSubscription: Subscription;
  dateFrom = '';
  dateTo = '';
  dateFromRequest = '';
  dateToRequest = '';
  lang = '';
  langCode = '';
  languages = languages;
  constructor(public billService: BillService, public settingsService: SettingsService, public router: Router, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang', 'en');
      this.langCode = localStorage.getItem('lang');
      this.changeLangByCode(this.langCode);

    }
    else {
      this.langCode = localStorage.getItem('lang');
      this.changeLangByCode(this.langCode);
    }
    this.changeLang(undefined, this.langCode);
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



    // let _bills$ = (searchValues: string) => this.billService.getCosts(null, null, null, this.billsLimit, this.billsOffset);
    // if (this.buttonSwitchMessage === 'Switch to costs!') {
    //   _bills$ = (searchValues: string) => this.billService.getProfits(null, null, null, this.billsLimit, this.billsOffset);
    // }
    // _bills$('').subscribe((data:any) => {
    //   if (this.buttonSwitchMessage === 'Switch to costs!') {
    //     this.bills$ = data.profits;
    //   }
    //   else {
    //     this.bills$ = data.costs;
    //   }
    // }, (data:any) => this.error_message = data.error.message);
    // let settings = (searchValues: string) => zip(_bills$(searchValues));



    this.subSubscription = this.searchField.valueChanges.pipe(debounceTime(500), flatMap(value => {
      if (this.buttonSwitchMessage === 'Switch to costs!') {
        return this.billService.getProfits(this.categoryId, this.subCategoryId, this.currencyId, this.billsLimit, this.billsOffset, this.searchField.value, this.dateFromRequest, this.dateToRequest);
      }
      else {
        return this.billService.getCosts(this.categoryId, this.subCategoryId, this.currencyId, this.billsLimit, this.billsOffset, this.searchField.value, this.dateFromRequest, this.dateToRequest);
      }
    })).subscribe((data: any) => {
      if (this.buttonSwitchMessage === 'Switch to costs!') {
        this.bills$ = data.profits;
        this.billsLengthList = data.profits_length_list;
      }
      else {
        this.bills$ = data.costs;
        this.billsLengthList = data.costs_length_list;
      }
    });

  }

  getCosts(categoryId: number, subCategoryId: number, currencyId: number, billsLimit: number, billsOffset: number) {
    this.billService.getCosts(categoryId, subCategoryId, currencyId, this.billsLimit, this.billsOffset, this.searchField.value, this.dateFromRequest, this.dateToRequest).subscribe((data:any) => {
      this.bills$ = data.costs;
      this.billsLengthList = data.costs_length_list;
    }, (data:any) => this.error_message = data.error.message);
  }

  getProfits(categoryId: number, subCategoryId: number, currencyId: number, billsLimit: number, billsOffset: number) {
    this.billService.getProfits(categoryId, subCategoryId, currencyId, this.billsLimit, this.billsOffset, this.searchField.value, this.dateFromRequest, this.dateToRequest).subscribe((data:any) => {
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
    else if (type === 'currencyId') {
      this.currencyId = event.value;
    }
    else if (type === 'dateFrom') {
      console.log(event, type);
      console.log(event.value);
      const tempDateFrom = new Date(event.value);
      const dateString = tempDateFrom.getFullYear() + '-' + (tempDateFrom.getMonth() + 1) + '-' + tempDateFrom.getDate() + 'T' + tempDateFrom.getHours() + ':' + tempDateFrom.getMinutes() + ':' + tempDateFrom.getSeconds() + '.' + tempDateFrom.getMilliseconds();
      console.log(dateString);
      this.dateFromRequest = dateString;
    }
    else if (type === 'dateTo') {
      console.log(event, type);
      console.log(event.value);
      const tempDateTo = new Date(event.value);
      const dateString = tempDateTo.getFullYear() + '-' + (tempDateTo.getMonth() + 1) + '-' + tempDateTo.getDate() + 'T' + tempDateTo.getHours() + ':' + tempDateTo.getMinutes() + ':' + tempDateTo.getSeconds() + '.' + tempDateTo.getMilliseconds();
      console.log(dateString);
      this.dateToRequest = dateString;
    }
    else {

    }
    if (this.buttonSwitchMessage === 'Switch to costs!') {
      this.getProfits(this.categoryId, this.subCategoryId, this.currencyId, this.billsLimit, this.billsOffset);
    }
    else {
      this.getCosts(this.categoryId, this.subCategoryId, this.currencyId, this.billsLimit, this.billsOffset);
    }
  }

  displayedColumns: string[] = ['title', 'comment', "bill_category", "bill_sub_category", "bill_price", "bill_currency", "showDetails"];

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
        billQuantity: bill.quantity,
        billNotMyCity: bill.not_my_city
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
      this.billsLimit = 5;
      this.billsOffset = 0;
      this.getCosts(categoryId, subCategoryId, currencyId, this.billsLimit, this.billsOffset);

    }
    else {
      this.buttonSwitchMessage = 'Switch to costs!';
      this.billsLimit = 5;
      this.billsOffset = 0;
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
    this.billService.printBills(categoryId, subCategoryId, currencyId, billType, this.searchField.value, this.dateFromRequest, this.dateToRequest).subscribe(
      (response) => {
        const blob = new Blob([response], {type: 'application/pdf'});
        saveAs(blob, 'report.pdf');
      },
      (data: any) => {
        this.snackBar.open(data.error.message, null, {duration: 4000, verticalPosition: 'top'});
        // show your error message here
      }
    );
  }

  newBillSubmit(categoryId: number, subCategoryId: number, currencyId: number, title: string, comment: string, price: string, quantity: number, notMyCity: boolean, created: string) {

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

  clearDateFrom() {
    this.dateFrom = '';
    this.dateFromRequest = '';
    if (this.buttonSwitchMessage === 'Switch to costs!') {
      this.getProfits(this.categoryId, this.subCategoryId, this.currencyId, this.billsLimit, this.billsOffset);
    }
    else {
      this.getCosts(this.categoryId, this.subCategoryId, this.currencyId, this.billsLimit, this.billsOffset);
    }
  }
  clearDateTo() {
    this.dateTo = '';
    this.dateToRequest = '';
    if (this.buttonSwitchMessage === 'Switch to costs!') {
      this.getProfits(this.categoryId, this.subCategoryId, this.currencyId, this.billsLimit, this.billsOffset);
    }
    else {
      this.getCosts(this.categoryId, this.subCategoryId, this.currencyId, this.billsLimit, this.billsOffset);
    }
  }

  // Translations
  changeLangByCode(langCode: string) {
    if (langCode === 'en') {
      this.lang = 'English';
    }
    else if (langCode === 'de') {
      this.lang = 'German';
    }
    else if (langCode === 'hr') {
      this.lang = 'Croatian';
    }
    else {
      this.langCode = 'en'
      this.lang = 'English';
    }
  }

  changeLang(event, lang: string) {
    if (!lang) {
      localStorage.setItem('lang', event.value);
    }
    else {
      localStorage.setItem('lang', lang);
    }
    this.langCode = localStorage.getItem('lang');
    this.changeLangByCode(this.langCode);
  }

  _translation(key: string, language: string) {
    return translateFunction(key, language);
  }
}
