import { Component, OnInit } from '@angular/core';
import {languages, translateFunction} from '../translations/translations';
import {NgxSpinnerService} from 'ngx-spinner';
import {UserService} from '../services/user.service';
import {User} from '../model';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  lang = '';
  langCode = '';
  languages = languages;
  rate = 0;
  user: User;

  constructor(private spinner: NgxSpinnerService, private userService: UserService) { }

  ngOnInit() {
    this.userService.find_by_id().subscribe((data: any) => {
      this.user = data.user;
      this.rate = this.user.application_rating;
    });
  }

  changeRating(event) {
    this.userService.updateApplicationRating(event).subscribe((data: any) => {
      this.userService.find_by_id().subscribe((data: any) => {
        this.user = data.user;
        this.rate = this.user.application_rating;
      });
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
