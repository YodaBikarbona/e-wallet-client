import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData} from '../bills/new-bill.component';
import {Router} from '@angular/router';
import {languages, translateFunction} from '../translations/translations';

@Component({
  selector: 'app-register',
  templateUrl: './register-confirmation.component.html',
  styleUrls: ['./register-confirmation.component.scss']
})
export class DialogRegisterConfirmationComponent implements OnInit, OnDestroy {

  lang = '';
  langCode = '';
  languages = languages;

  constructor(public dialogRef: MatDialogRef<DialogRegisterConfirmationComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, public loginRouter: Router) { }

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
    //setTimeout(this.cl, 5000);
  }

  ngOnDestroy() {
  }

  onNoClick(data: any): void {
    this.dialogRef.close();
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
