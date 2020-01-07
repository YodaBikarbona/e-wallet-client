import { Component, OnInit } from '@angular/core';
import {languages, translateFunction} from '../translations/translations';
import {NgxSpinnerService} from 'ngx-spinner';
import {map} from 'rxjs/operators';
import {DialogNewSuggestionComponent} from './new-suggestion.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {

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

  openDialogtSuggestSuggestion(): void {
    const dialogRef = this.dialog.open(DialogNewSuggestionComponent, {
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
        // this.applicationService.getBugs().subscribe((data:any) => {
        //   this.bugs = data.bugs;
        //   this.spinner.hide();
        //   console.log(this.bugs);
        // }, (data: any) => {
        //   this.spinner.hide();
        // });
    }, (data: any) => {
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
