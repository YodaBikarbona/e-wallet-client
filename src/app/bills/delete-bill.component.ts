import {Component, Inject, OnInit} from '@angular/core';
import {BillCategory, Currency} from '../model';
import {DialogNewBillComponent} from './new-bill.component';
import {map} from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData2} from './show-bill.component';

export interface DialogData3 {
  deleted: boolean;
}

@Component({
  selector: 'app-bills',
  templateUrl: './delete-bill.component.html',
  styleUrls: ['./delete-bill.component.scss']
})
export class DialogDeleteBillComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDeleteBillComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData3) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete() {
    this.data.deleted = true;
  }
}
