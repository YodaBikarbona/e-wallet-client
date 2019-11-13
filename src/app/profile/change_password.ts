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
})
export class DialogChangePasswordComponent {

  error_message = '';
  lang = '';
  langCode = '';
  languages = languages;

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
