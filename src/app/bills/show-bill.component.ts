import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {SettingsService} from '../services/settings.service';
import {BillService} from '../services/bill.service';
import {DialogData, DialogNewBillComponent} from './new-bill.component';
import {map} from 'rxjs/operators';
import {BillCategory, Currency} from '../model';
import {DialogDeleteBillComponent} from './delete-bill.component';

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

  constructor(public dialogRef: MatDialogRef<DialogShowBillComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData2, public settingsService: SettingsService, public billService: BillService, public dialog: MatDialog) { }

  ngOnInit() {
    this.data.subCategories$ = this.settingsService.getSubCategoriesByCategories(this.data.categoryId).pipe(map(((data: any) => data.sub_categories)));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onChange(event, type: string) {
    if (type === 'categoryId') {
      this.data.subCategories$ = this.getSubcategories(event.value);
    }
  }

  getSubcategories(event) {
    return this.settingsService.getSubCategoriesByCategories(event).pipe(map(((data: any) => data.sub_categories)));
  }

  deleteBill(billId: number) {
    this.billService.deleteBill(billId).subscribe((data: any) => {
      this.onNoClick();
    }, (data:any) => {

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
    });
  }
}
