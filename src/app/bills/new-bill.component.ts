import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SettingsService} from '../services/settings.service';
import {BillCategory, BillSubCategory, Currency} from '../model';
import {flatMap, map} from 'rxjs/operators';
import {BillService} from '../services/bill.service';

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

  constructor(public dialogRef: MatDialogRef<DialogNewBillComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, public settingsService: SettingsService, public billService: BillService) { }

  ngOnInit() {
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
    if (data.newBillType === 'profits') {
      this.billService.newProfits(data.categoryId, data.subCategoryId, data.currencyId, data.title, data.comment, data.price, data.quantity, data.notMyCity).subscribe((data:any) => {
      }, (data:any) => this.error_message = data.error.message);
    }
    else {
      this.billService.newCosts(data.categoryId, data.subCategoryId, data.currencyId, data.title, data.comment, data.price, data.quantity, data.notMyCity).subscribe((data:any) => {
      }, (data:any) => this.error_message = data.error.message);
    }
  }

  toogle(event: any) {
    console.log(event)
    this.data.notMyCity = event.checked;
  }

}
