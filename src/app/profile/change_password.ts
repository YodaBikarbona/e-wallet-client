import {Component, Inject, NgModule} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

export interface DialogData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: 'change_password.html',
})
export class DialogChangePasswordComponent {

  error_message = '';

  constructor(public userService: UserService, public dialogRef: MatDialogRef<DialogChangePasswordComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, public router: Router) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  changePassword(data: any) {
    this.userService.changePassword(data.currentPassword, data.newPassword, data.confirmPassword).subscribe((data: any) => {
      this.dialogRef.close();
      setTimeout(() => {
      localStorage.clear();
      this.router.navigate(['login']);
    }, 2000);
      },
      (data: any) => this.error_message = data.error.message);
    console.log(data.currentPassword, data.newPassword, data.confirmPassword);
  }
}
