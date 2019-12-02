import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AuthenticationRequest } from '../model';
import {RestartPasswordService} from '../services/restart-password.service';
import {MatSnackBar} from '@angular/material';
import {not} from 'rxjs/internal-compatibility';
import {languages, translateFunction} from '../translations/translations';

import { NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  message: string;
  userActive: boolean = true;
  authentcationRequest: AuthenticationRequest = null;
  userEmail = '';
  howApplicationWorks = false;
  lang = '';
  langCode = '';
  languages = languages;
  showPassword = false;

  constructor(public authService: AuthenticationService, public router: Router, public passwordService: RestartPasswordService, private snackBar: MatSnackBar, private spinner: NgxSpinnerService) { }
  //constructor() { }

  ngOnInit() {
    if (localStorage.getItem('auth-token')) {
      this.router.navigate(['dashboard']);
    }
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

  login(email: string, password: string) {
    if (email != '') {
      this.userEmail = email;
    }
    let request = new AuthenticationRequest(email, password);
    this.spinner.show();
    this.authService.authenticate(request)
      .subscribe(res => {
        this.spinner.hide();
        this.router.navigate(['dashboard']);
        },
        err => {
          this.spinner.hide();
          if (err.message) {
            this.snackBar.open(err.message, null, {duration: 4000, verticalPosition: 'top'});
            // this.message = err.message;
          } else {
            this.authentcationRequest = new AuthenticationRequest(err.email, err.password);
            this.userActive = false;
          }
        });
  }

  activateUser(code: string) {
    if (this.authentcationRequest) {
      this.authentcationRequest.code = code;
      //this.spinner.show();
      this.authService.authenticate(this.authentcationRequest)
        .subscribe(res => {
          this.spinner.hide();
          this.router.navigate(['dashboard']);
          }, (data: any) => {
          this.spinner.hide();
        });
    }
  }

  /*signIn(username: string, password: string) {
    console.log(username, password)
  }*/

  restartPassword(email: string) {
    //this.spinner.show();
    this.passwordService.restartLoginCode(email).subscribe((data:any) => {
      this.spinner.hide();
    }, (data:any) => {
      this.spinner.hide();
    });
  }

  toogleShow() {
    if (this.howApplicationWorks === false) {
      this.howApplicationWorks = true;
    }
    else {
      this.howApplicationWorks = false;
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


