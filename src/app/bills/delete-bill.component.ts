import {Component, Inject, OnInit} from '@angular/core';
import {BillCategory, Currency} from '../model';
import {DialogNewBillComponent} from './new-bill.component';
import {map} from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData2} from './show-bill.component';
import {languages, translateFunction} from '../translations/translations';

export interface DialogData3 {
  deleted: boolean;
}

@Component({
  selector: 'app-bills',
  templateUrl: './delete-bill.component.html',
  styleUrls: ['./delete-bill.component.scss']
})
export class DialogDeleteBillComponent implements OnInit {

  lang = '';
  langCode = '';
  languages = languages;

  constructor(public dialogRef: MatDialogRef<DialogDeleteBillComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData3) { }

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

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete() {
    this.data.deleted = true;
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
