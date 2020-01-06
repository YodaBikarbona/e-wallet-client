import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {DialogData} from '../bills/new-bill.component';
import {languages, translateFunction} from '../translations/translations';
import {ApplicationService} from '../services/application.service';

export interface DialogData4 {
  bugComment: string;
}

@Component({
  selector: 'app-bugs',
  templateUrl: './new-bug.component.html',
  styleUrls: ['./new-bug.component.scss']
})
export class DialogNewBugComponent implements OnInit {

  lang = '';
  langCode = '';
  languages = languages;

  constructor(public dialogRef: MatDialogRef<DialogNewBugComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData4, private applicationService: ApplicationService, private snackBar: MatSnackBar) { }

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

  reportBug(data) {
    this.applicationService.addBug(data.bugComment).subscribe( (data: any) => {
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
