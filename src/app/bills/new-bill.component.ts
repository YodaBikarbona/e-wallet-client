import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {SettingsService} from '../services/settings.service';
import {BillCategory, BillSubCategory, Currency} from '../model';
import {flatMap, map} from 'rxjs/operators';
import {BillService} from '../services/bill.service';
import {languages, translateFunction} from '../translations/translations';

export interface DialogData {
  currencies$: Currency[];
  categories$: BillCategory[];
  subCategories$: any;
  categoryId: number;
  newBillType: string;
  subCategoryId: any;
  currencyId: number;
  title: string;
  comment: string;
  price: number;
  quantity: number;
  notMyCity: boolean;
}

@Component({
  selector: 'app-bills',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.scss']
})
export class DialogNewBillComponent implements OnInit {

  error_message = '';
  lang = '';
  langCode = '';
  languages = languages;

  constructor(public dialogRef: MatDialogRef<DialogNewBillComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, public settingsService: SettingsService, public billService: BillService, private snackBar: MatSnackBar) { }

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
    this.onChange(null, 'categoryId', this.data.categoryId);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onChange(event, type: string, subCat: number) {
    if (type === 'categoryId') {
      if (!subCat) {
        this.data.subCategories$ = this.getSubcategories(event.value);
      }
      else {
        this.data.subCategories$ = this.getSubcategories(subCat);
      }
    }
  }

  getSubcategories(event) {
    return this.settingsService.getSubCategoriesByCategories(event).pipe(map(((data: any) => data.sub_categories)));
  }

  addNewBill(data: any) {
    if (!data.notMyCity) {
      data.notMyCity = false;
    }
    const created = new Date()
    const createdString = created.getFullYear() + '-' + (created.getMonth() + 1) + '-' + created.getDate() + 'T' + created.getHours() + ':' + created.getMinutes() + ':' + created.getSeconds() + '.' + created.getMilliseconds();
    if (data.newBillType === 'profits') {
      this.billService.newProfits(data.categoryId, data.subCategoryId, data.currencyId, data.title, data.comment, data.price, data.quantity, data.notMyCity, createdString).subscribe((data:any) => {
        this.onNoClick();
      }, (data:any) => {
        this.snackBar.open(data.error.message, null, {duration: 4000, verticalPosition: 'top'});
        this.error_message = data.error.message;
      });
    }
    else {
      this.billService.newCosts(data.categoryId, data.subCategoryId, data.currencyId, data.title, data.comment, data.price, data.quantity, data.notMyCity, createdString).subscribe((data:any) => {
        this.onNoClick();
      }, (data:any) => {
        this.snackBar.open(data.error.message, null, {duration: 4000, verticalPosition: 'top'});
        this.error_message = data.error.message;
      });
    }
  }

  toogle(event: any) {
    console.log(event)
    this.data.notMyCity = event.checked;
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
