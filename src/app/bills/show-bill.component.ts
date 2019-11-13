import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {SettingsService} from '../services/settings.service';
import {BillService} from '../services/bill.service';
import {DialogData, DialogNewBillComponent} from './new-bill.component';
import {map} from 'rxjs/operators';
import {BillCategory, Currency} from '../model';
import {DialogDeleteBillComponent} from './delete-bill.component';
import {languages, translateFunction} from '../translations/translations';

// export interface DialogData {
//   BillType: string;
//   billDate: string;
//   currencyId: number;
//   billTitle: string;
//   billComment: string;
//   billPrice: number;
//   billId: number;
// }

export interface DialogData2 {
  currencies$: Currency[];
  categories$: BillCategory[];
  subCategories$: any;
  categoryId: number;
  BillType: string;
  billDate: string;
  currencyId: number;
  billTitle: string;
  billComment: string;
  billPrice: number;
  billId: number;
  subCategoryId: any;
  billQuantity: number;
  billNotMyCity: boolean;
}

@Component({
  selector: 'app-bills',
  templateUrl: './show-bill.component.html',
  styleUrls: ['./show-bill.component.scss']
})
export class DialogShowBillComponent implements OnInit {

  lang = '';
  langCode = '';
  languages = languages;

  constructor(public dialogRef: MatDialogRef<DialogShowBillComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData2, public settingsService: SettingsService, public billService: BillService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

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
    this.data.subCategories$ = this.settingsService.getSubCategoriesByCategories(this.data.categoryId).pipe(map(((data: any) => data.sub_categories)));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onChange(event, type: string) {
    if (type === 'categoryId') {
      this.data.subCategories$ = this.getSubcategories(event.value);
      this.data.subCategoryId = null;
    }
  }

  getSubcategories(event) {
    return this.settingsService.getSubCategoriesByCategories(event).pipe(map(((data: any) => data.sub_categories)));
  }

  deleteBill(billId: number) {
    this.billService.deleteBill(billId).subscribe((data: any) => {
      this.onNoClick();
    }, (data:any) => {
      this.snackBar.open(data.error.message, null, {duration: 4000, verticalPosition: 'top'});
    });
  }

  openDialogDeleteBill(billId: number): void {
    const dialogRef = this.dialog.open(DialogDeleteBillComponent, {
      //width: '300px',
      disableClose: true,
      data: {
        deleted: false
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
        if (result) {
          this.deleteBill(billId);
        }
    }, (data: any) => {
      });
  }

  editBill(editData: any) {
    this.billService.editBill(editData).subscribe((data: any) => {
      this.onNoClick();
    }, (data:any) => {
      this.snackBar.open(data.error.message, null, {duration: 4000, verticalPosition: 'top'});
    });
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
