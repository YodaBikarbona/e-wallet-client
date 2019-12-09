import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogNewBugComponent} from './new-bug.component';
import {map} from 'rxjs/operators';
import {languages, translateFunction} from '../translations/translations';

@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.scss']
})
export class BugsComponent implements OnInit {

  lang = '';
  langCode = '';
  languages = languages;

  constructor(public dialog: MatDialog) { }

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

  openDialogReportBug(): void {
    const dialogRef = this.dialog.open(DialogNewBugComponent, {
      width: '300px',
      disableClose: true,
      data: {
        bugComment: '',
      }
    });
    dialogRef.afterClosed().pipe(
    //   flatMap((result: any) => {
    //     if (this.buttonSwitchMessage === 'Switch to costs!') {
    //       this.getProfits(this.categoryId, this.subCategoryId, this.currencyId);
    //     }
    //     else {
    //       this.getCosts(this.categoryId, this.subCategoryId, this.currencyId);
    // }
    //   }),
      map(((data: any) => data)))
      .subscribe(result => {
        console.log(result);
    }, (data: any) => {
        console.log(data);
      });
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
