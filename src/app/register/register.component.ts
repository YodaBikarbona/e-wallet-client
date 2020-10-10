import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {City, Country, EditProfile, RegisterRequest, SaveNewPasswordRequest} from '../model';
import {map} from 'rxjs/operators';
import {API_URL} from '../app.constants';
import {HttpClient} from '@angular/common/http';
import {RegisterService} from '../services/register.service';
import {CityResolver, CountryResolver} from '../services/country.service';
import {MatDateFormats, MatDialog, MatSnackBar} from '@angular/material';
import DateTimeFormat = Intl.DateTimeFormat;
import {DialogShowBillComponent} from '../bills/show-bill.component';
import {DialogRegisterConfirmationComponent} from './register-confirmation.component';
import {error} from '@angular/compiler/src/util';
import {languages, translateFunction} from '../translations/translations';
import {isDigit} from 'codelyzer/angular/styles/chars';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {until} from 'selenium-webdriver';
import elementIsDisabled = until.elementIsDisabled;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  //regRequest: any; // = new RegisterRequest();

  countries$: Observable<Country[]>;
  cities$: Observable<City[]>;
  passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  regRequest: RegisterRequest = new RegisterRequest(null, null, null, null, null, null, null, null, null, null);
  lang = '';
  langCode = '';
  languages = languages;
  showPassword = false;
  passwordStrength = 0;
  isUpper = false;
  isLower = false;
  isDigit = false;
  isSpec = false;
  constructor(public cityService: CityResolver, public router: ActivatedRoute, public registerService: RegisterService, public dialog: MatDialog, public loginRouter: Router, private snackBar: MatSnackBar, public routerRedirect: Router, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstNameCtrl: ['', Validators.required],
      lastNameCtrl: ['', Validators.required],
      emailCtrl: ['', Validators.required],
      birthDateCtrl: ['', Validators.required],
      genderCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      countryCtrl: ['', Validators.required],
      cityCtrl: ['', Validators.required],
      addressCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      passwordCtrl: ['', Validators.required],
      confirmPasswordCtrl: ['', Validators.required],
    });
    if (localStorage.getItem('auth-token')) {
      this.routerRedirect.navigate(['dashboard']);
    }
    this.countries$ = this.router.data.pipe(map(data => data.countries));
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
  }

  registerSubmit(reqData: any) {
    let finalBirthDate = '';
    let originDate = '';
    originDate = reqData.birthDate

    const bDate = new Date(reqData.birthDate);
    // let dateStr = mydate.toString("MMMM yyyy");
    const finalDate = bDate.toISOString();
    // reqData.birthDate = reqData.birthDate.replace("/","-");
    // if (regRequest.birthDate) {
    //   // originDate = regRequest.birthDate
    //   //
    //   // let birthDateFormat = regRequest.birthDate.toLocaleDateString().replace("/","-");
    //   // birthDateFormat = birthDateFormat.replace("/","-");
    //   // birthDateFormat = birthDateFormat.split('-');
    //   // finalBirthDate = finalBirthDate + birthDateFormat[2] + '-' + birthDateFormat[1] + '-' + birthDateFormat[0];
    //   // regRequest.birthDate = finalBirthDate;
    // }
    if (reqData.password != reqData.confirmPassword) {
      this.snackBar.open(this._translation('Passwords are not same!', this.langCode), null, {duration: 4000, verticalPosition: 'top'});
    }
    else {
      if (this.passwordStrength === 100) {
        this.registerService.register(reqData.address, finalDate, reqData.city_id, reqData.confirmPassword, reqData.email, reqData.firstName, reqData.gender, reqData.lastName, reqData.password, reqData.country_id).subscribe((data: any) => {
            this.openDialogRegisterConfirmation();
          }, (data: any) => {
            console.log(data.error.message);
            if (data.error.message === this._translation('Password is not valid!', this.langCode)) {
              console.log("Nešto sa šifrom")
              this.snackBar.open(this._translation('Password should be at least 8 characters long and should contain one number, one character and one special character!', this.langCode), null, {
                duration: 4000,
                verticalPosition: 'top'
              });
            } else {
              this.snackBar.open(data.error.message, null, {duration: 4000, verticalPosition: 'top'});
            }
          }
        );
      }
    }
  }


  onCountryChange(event) {
    const countryId = event.value;
    this.cityService.resolve(countryId).subscribe((data:any) => this.cities$ = data.cities);
  }

  openDialogRegisterConfirmation(): void {
    const dialogRef = this.dialog.open(DialogRegisterConfirmationComponent, {
      //width: '300px',
      disableClose: true,
      data: {
      }
    });

    dialogRef.afterClosed().pipe(
      map(((data: any) => data)))
      .subscribe((result: any) => {
        this.loginRouter.navigate(['login']);
    });
  }

  toogleShowPassword() {
    if (this.showPassword === false) {
      this.showPassword = true;
    }
    else {
      this.showPassword = false;
    }
  }

  checkPasswordStrength(event) {
    this.isUpper = false;
    this.isLower = false;
    this.isDigit = false;
    this.isSpec = false;
    let strength = 0;
    if (event != null) {
      if (event.match(/[a-z]+/)) {
        strength += 1;
        this.isLower = true;
      }
      if (event.match(/[A-Z]+/)) {
        strength += 1;
        this.isUpper = true;
      }
      if (event.match(/[@#$%^&+=.!/?*-]+/)) {
        strength += 1;
        this.isSpec = true;
      }
      if (event.match(/[0-9]+/)) {
        strength += 1;
        this.isDigit = true;
      }
      if ((event.length > 7) && (event.length < 26)) {
        strength += 1;
      }
      this.passwordStrength = strength * 20;
    }
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
