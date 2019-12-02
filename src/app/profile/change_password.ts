import {Component, Inject, NgModule} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {languages, translateFunction} from '../translations/translations';

export interface DialogData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: 'change_password.html',
  styleUrls: ['./change_password.scss']
})
export class DialogChangePasswordComponent {

  error_message = '';
  lang = '';
  langCode = '';
  languages = languages;
  showPassword = false;
  passwordStrength = 0;
  isUpper = false;
  isLower = false;
  isDigit = false;
  isSpec = false;

  constructor(public userService: UserService, public dialogRef: MatDialogRef<DialogChangePasswordComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, public router: Router, private snackBar: MatSnackBar) {
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
      (data: any) => {
      this.snackBar.open(data.error.message, null, {duration: 4000, verticalPosition: 'top'});
      this.error_message = data.error.message;});
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
