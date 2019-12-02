import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RestartPasswordRequest} from '../model';
import {RestartPasswordService} from '../services/restart-password.service';
import {languages, translateFunction} from '../translations/translations';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-restart-password',
  templateUrl: './restart-password.component.html',
  styleUrls: ['./restart-password.component.scss']
})
export class RestartPasswordComponent implements OnInit, OnDestroy {

  restart = false;
  restart_code = false;
  email = '';
  error_message = '';
  restartRequest: RestartPasswordRequest = null;
  lang = '';
  langCode = '';
  languages = languages;
  passwordStrength = 0;
  isUpper = false;
  isLower = false;
  isDigit = false;
  isSpec = false;
  showPassword = false;

  constructor(public passwordService: RestartPasswordService, public router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
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

  ngOnDestroy(): void {
  }

  restartPassword(email: string) {
    this.passwordService.restartPassword(email).subscribe((data:any) => {
      this.restart = true;
      this.email = email;
      this.error_message = '';
    }, (data:any) => {
      this.snackBar.open(data.error.message, null, {duration: 4000, verticalPosition: 'top'});
      this.error_message = data.error.message;
    });
  }

  restartPasswordCode(code: string, email: string) {
    this.passwordService.restartPasswordCode(code, email).subscribe((data:any) => {
      this.restart_code = true;
      this.error_message = '';
    }, (data:any) => {
      this.snackBar.open(data.error.message, null, {duration: 4000, verticalPosition: 'top'});
      this.error_message = data.error.message;
    });
  }

  saveNewPassword(newPassword: string, confirmPassword: string, email: string) {
    if (newPassword != confirmPassword) {
      this.snackBar.open(this._translation('Passwords are not same!', this.langCode), null, {duration: 4000, verticalPosition: 'top'});
      this.error_message = 'Passwords are not same!';
    }
    else {
      this.passwordService.saveNewPassword(newPassword, confirmPassword, email).subscribe((data: any) => this.router.navigate(['login']), (data:any) => this.error_message = data.error.message);
    }
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
