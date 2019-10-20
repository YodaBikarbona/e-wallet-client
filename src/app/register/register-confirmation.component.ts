import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData} from '../bills/new-bill.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register-confirmation.component.html',
  styleUrls: ['./register-confirmation.component.scss']
})
export class DialogRegisterConfirmationComponent implements OnInit, OnDestroy {

  constructor(public dialogRef: MatDialogRef<DialogRegisterConfirmationComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, public loginRouter: Router) { }

  ngOnInit() {
    //setTimeout(this.cl, 5000);
  }

  ngOnDestroy() {
  }

  onNoClick(data: any): void {
    this.dialogRef.close();
  }

}
