import { Component, OnInit, Inject } from '@angular/core';
import { API_URL } from '../app.constants';
import {City, Country, Currency, User} from '../model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import {flatMap, map, tap} from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogChangePasswordComponent} from './change_password';
import {DialogEditProfileComponent} from './edit_profile';
import {Observable} from 'rxjs';
import {CityResolver} from '../services/country.service';
import {SettingsService} from '../services/settings.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  url = API_URL;
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  countries$: Observable<Country[]>;
  cities$: Observable<City[]>;
  edited = false;
  currencies$: Currency[];
  error_message = '';

  constructor(private router: ActivatedRoute, private userService: UserService, private autenticationService: AuthenticationService, public dialog: MatDialog, public cityService: CityResolver, public settingsService: SettingsService) {
  }

  ngOnInit() {
    this.router.data.pipe(map(data => data.user.user), tap(console.log)).subscribe(user => this.user = user);
    this.countries$ = this.router.data.pipe(map(data => data.countries));

    this.cities$ = this.onCountryChange(event = null, this.user.country_id);
    this.settingsService.getCurrencies(true, '').subscribe((data:any) => {
      this.currencies$ = data.currencies;
    }, (data:any) => this.error_message = data.error.message);

  }

  image_selected (event) {
    let image = event.target.files[0];
    let formData = new FormData();
    formData.set("image", image);
    this.userService.saveUserPicture(formData).subscribe(image => this.user.image.file_name = image, console.log);
  }

  openDialogChangePassword(): void {
    const dialogRef = this.dialog.open(DialogChangePasswordComponent, {
      width: '300px',
      disableClose: true,
      data: {currentPassword: this.currentPassword, newPassword: this.newPassword, confirmPassword: this.confirmPassword}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.newPassword = result;
    });
  }

  openDialogEditProfile(): void {
    const dialogRef = this.dialog.open(DialogEditProfileComponent, {
      width: '400px',
      height: '520px',
      disableClose: true,
      data: {
        firstName: this.user.first_name,
        lastName: this.user.last_name,
        birthDate: this.user.birth_date,
        address: this.user.address,
        gender: this.user.gender,
        countries$: this.countries$,
        cities$: this.cities$,
        country_id: this.user.country_id,
        city_id: this.user.city_id,
        email: this.user.email,
        phone: this.user.phone,
        currencies$: this.currencies$,
        currency_id: this.user.currency_id,
        edited: this.edited,
      }
    });

    dialogRef.afterClosed().pipe(
      flatMap(result => this.userService.find_by_id()),
      map(((data: any) => data.user)))
      .subscribe(result => {
        console.log("result", result)
        this.user = result;
      console.log('The dialog was closed');
    });
  }

  onCountryChange(event, countryId?) {
    let _countryId = '';
    if (event != null) {
      _countryId = event.value;
    } else {
      _countryId = countryId;
    }
    return this.cityService.resolve(_countryId).pipe(map(data => data.cities));
  }

}
