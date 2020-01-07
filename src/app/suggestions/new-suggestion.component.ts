import {Component, Inject, OnInit} from '@angular/core';
import {languages, translateFunction} from '../translations/translations';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ApplicationService} from '../services/application.service';

export interface DialogData5 {
  suggestionComment: string;
}

@Component({
  selector: 'app-suggestions',
  templateUrl: './new-suggestion.component.html',
  styleUrls: ['./new-suggestion.component.scss']
})
export class DialogNewSuggestionComponent implements OnInit {

  lang = '';
  langCode = '';
  languages = languages;

  constructor(public dialogRef: MatDialogRef<DialogNewSuggestionComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData5, private applicationService: ApplicationService, private snackBar: MatSnackBar) { }

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

  suggestSuggestion(data) {
    this.applicationService.addSuggestion(data.suggestionComment).subscribe( (data: any) => {
      this.snackBar.open(this._translation('Suggestion is successfully created!', this.langCode), null, {duration: 4000, verticalPosition: 'top'});
      this.onNoClick();
    }, (data:any) => {
      this.snackBar.open(data.error.message, null, {duration: 4000, verticalPosition: 'top'});
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
