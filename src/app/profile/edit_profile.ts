import {Component, Inject, NgModule} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {CityResolver} from '../services/country.service';
import {Observable} from 'rxjs';
import {City} from '../model';

export interface DialogData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: 'edit_profile.html',
})
export class DialogEditProfileComponent {

  error_message = '';
  cities$: Observable<City[]>;

  constructor(public cityService: CityResolver, public userService: UserService, public dialogRef: MatDialogRef<DialogEditProfileComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, public router: Router) {
    console.log(data)
  }

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
  }

  onCountryChange(event) {
    let _countryId = '';
    _countryId = event.value;
    this.data.cities$ = this.cityService.resolve(_countryId).pipe(map(data => data.cities));
  }
}
