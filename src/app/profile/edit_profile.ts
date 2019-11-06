import {Component, Inject, NgModule} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {map, tap} from 'rxjs/operators';
import {CityResolver} from '../services/country.service';
import {Observable} from 'rxjs';
import {City, Currency, EditProfile, User} from '../model';
import {languages, translateFunction} from '../translations/translations';

export interface DialogData {
  edited: boolean;
}

@Component({
  selector: 'app-profile',
  templateUrl: 'edit_profile.html',
  styleUrls: ['./edit_profile.scss']
})
export class DialogEditProfileComponent {

  error_message = '';
  cities$: Observable<City[]>;
  edited: boolean;
  dataEdit: EditProfile;
  oldBirthDate = '';
  lang = '';
  langCode = '';
  languages = languages

  constructor(public cityService: CityResolver, public userService: UserService, public dialogRef: MatDialogRef<DialogEditProfileComponent>, @Inject(MAT_DIALOG_DATA) public data: EditProfile, public router: Router) {
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
    this.dataEdit = data;
    //this.data = this.dataEdit;
    //data = this.dataEdit;
    this.oldBirthDate = data.birthDate;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editProfile(userData: any) {
    const bDate = new Date(userData.birthDate);
    //const bDate = new Date(userData.birthDate);
    const orginDate = userData.birthDate;
    // let dateStr = mydate.toString("MMMM yyyy");
    const finalDate = bDate.toISOString();
    if (typeof userData.birthDate === 'string') {
      userData.birthDate = 'null';
    }
    else {
      userData.birthDate = finalDate;
    }
    this.userService.editProfile(userData).subscribe((data: any) => {
      //userData.edited = true;
      this.dialogRef.close();
      setTimeout(() => {
      //localStorage.clear();
      //this.router.navigate(['login']);
      this.edited = true;
    }, 2000);
      },
      (data: any) => {
        this.error_message = data.error.message;
        this.edited = false;
        userData.birthDate = orginDate;
      });
  }

  onCountryChange(event, userData: any) {
    let _countryId = '';
    if (event != null) {
      _countryId = event.value;
    } else {
      _countryId = userData.country_id;
    }
    userData.cities$ = this.cityService.resolve(_countryId).pipe(tap(console.log), map(data => data.cities));
  }

  onCountryChange2(event, countryId?) {
    let _countryId = '';
    if (event != null) {
      _countryId = event.value;
    } else {
      _countryId = countryId;
    }
    return this.cityService.resolve(_countryId).pipe(map(data => data));
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
