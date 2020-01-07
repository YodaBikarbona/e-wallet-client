import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogNewBugComponent} from './new-bug.component';
import {map} from 'rxjs/operators';
import {languages, translateFunction} from '../translations/translations';
import {NgxSpinnerService} from 'ngx-spinner';
import {ApplicationService} from '../services/application.service';

@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.scss']
})
export class BugsComponent implements OnInit {

  lang = '';
  langCode = '';
  languages = languages;
  bugs = [];

  constructor(public dialog: MatDialog, private spinner: NgxSpinnerService, private applicationService: ApplicationService) { }

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
    this.spinner.show();
    this.applicationService.getBugs().subscribe((data:any) => {
      this.bugs = data.bugs;
      this.spinner.hide();
    }, (data: any) => {
      this.spinner.hide();
    });
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
        this.applicationService.getBugs().subscribe((data:any) => {
          this.bugs = data.bugs;
          this.spinner.hide();
        }, (data: any) => {
          this.spinner.hide();
        });
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
