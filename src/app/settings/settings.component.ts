import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription, zip} from 'rxjs';
import {BillCategory, BillSubCategory, Currency} from '../model';
import {Router} from '@angular/router';
import {SettingsService} from '../services/settings.service';
import {MatSnackBar} from '@angular/material';
import {FormControl} from '@angular/forms';
import {debounce, debounceTime, flatMap} from 'rxjs/operators';
import {languages, translateFunction} from '../translations/translations';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  active: boolean = false;
  currencies$: Currency[];
  categories$: BillCategory[];
  subCategories$: BillSubCategory[];
  error_message = '';
  searchField = new FormControl('');
  subSubscription: Subscription;
  panelOpenState: boolean;
  activeCurrencies$: Currency[];
  lang = '';
  langCode = '';
  languages = languages;
  constructor(public settingsService: SettingsService, public router: Router, private snackBar: MatSnackBar, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
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
    let currencies = (searchValues: string) => this.settingsService.getCurrencies(this.active, searchValues);
    let categories = (searchValues: string) => this.settingsService.getCategories(this.active, searchValues);
    let subCategories = (searchValues: string) => this.settingsService.getSubCategories(this.active, searchValues);
    let activeCurrencies = (searchValues: string) => this.settingsService.getActiveCurrenciesLimit(true, searchValues);
    currencies('').subscribe((data:any) => {
      this.currencies$ = data.currencies;
      this.spinner.hide();
    }, (data:any) => {
      this.error_message = data.error.message;
      this.spinner.hide();
    });
    this.spinner.show();
    categories('').subscribe((data:any) => {
      this.categories$ = data.categories;
      this.spinner.hide();
    }, (data:any) => {
      this.error_message = data.error.message;
      this.spinner.hide();
    });
    this.spinner.show();
    subCategories('').subscribe((data:any) => {
      this.subCategories$ = data.sub_categories;
      this.spinner.hide();
    }, (data:any) => {
      this.error_message = data.error.message;
      this.spinner.hide();
    });
    this.spinner.show();
    activeCurrencies('').subscribe((data:any) => {
      this.activeCurrencies$ = data.currencies;
      this.spinner.hide();
    }, (data:any) => {
      this.error_message = data.error.message;
      this.spinner.hide();
    });
    let settings = (searchValues: string) => zip(currencies(searchValues), categories(searchValues), subCategories(searchValues));




    /*this.settingsService.getCurrencies(this.active, this.searchField).subscribe((data:any) => {
      this.currencies$ = data.currencies;
    }, (data:any) => this.error_message = data.error.message);
    this.settingsService.getCategories(this.active, this.searchField).subscribe((data:any) => {
      this.categories$ = data.categories;
    }, (data:any) => this.error_message = data.error.message);
    this.settingsService.getSubCategories(this.active, this.searchField).subscribe((data:any) => {
      this.subCategories$ = data.sub_categories;
    }, (data:any) => this.error_message = data.error.message);*/
    this.subSubscription = this.searchField.valueChanges.pipe(debounceTime(500), flatMap(value => settings(value))).subscribe((data:any) => {
      this.spinner.show();
      this.currencies$ = data[0].currencies;
      this.categories$ = data[1].categories;
      this.subCategories$ = data[2].sub_categories;
      this.spinner.hide();
    });
  }

  ngOnDestroy() {
    this.subSubscription.unsubscribe();
  }

  handleError(message: string) {
    this.snackBar.open(message, null, {duration: 4000});
    this.error_message = message;
  }
  changeActive() {
    this.spinner.show();
    this.active = !this.active;
    this.settingsService.getCurrencies(this.active, this.searchField.value).subscribe((data:any) => {
      this.currencies$ = data.currencies;
      this.spinner.hide();
    }, (data:any) => {
      this.error_message = data.error.message;
      this.spinner.hide();
    });
    this.spinner.show();
    this.settingsService.getCategories(this.active, this.searchField.value).subscribe((data:any) => {
      this.categories$ = data.categories;
      this.spinner.hide();
    }, (data:any) => {
      this.error_message = data.error.message;
      this.spinner.hide();
    });
    this.spinner.show();
    this.settingsService.getSubCategories(this.active, this.searchField.value).subscribe((data:any) => {
      this.subCategories$ = data.sub_categories;
      this.spinner.hide();
    }, (data:any) => {
      this.error_message = data.error.message;
      this.spinner.hide();
    });
  }
  activeCurrency(currencyId: number) {
    this.settingsService.ToogleActiveCurrency(true, this.searchField.value, currencyId).subscribe((data:any) => {
      this.settingsService.getCurrencies(this.active, this.searchField.value).subscribe((data:any) => {
      this.currencies$ = data.currencies;
      this.error_message = '';
      }, (data:any) => this.error_message = data.error.message);
    }, (data:any) => {
      this.snackBar.open(data.error.message, null, {duration: 4000, verticalPosition: 'top'});
      this.error_message = data.error.message;
    });
  }
  deactiveCurrency(currencyId: number) {
    this.settingsService.ToogleActiveCurrency(false, this.searchField.value, currencyId).subscribe((data:any) => {
      this.settingsService.getCurrencies(this.active, this.searchField.value).subscribe((data:any) => {
      this.currencies$ = data.currencies;
      this.error_message = '';
      }, (data:any) => this.error_message = data.error.message);
    }, (data:any) => this.handleError(data.error.message));
  }
  activeCategory(categoryId: number) {
    this.settingsService.ToogleActiveCategory(true, this.searchField.value, categoryId).subscribe((data:any) => {
      this.settingsService.getCategories(this.active, this.searchField.value).subscribe((data:any) => {
      this.categories$ = data.categories;
      this.error_message = '';
      this.settingsService.getSubCategories(this.active, this.searchField.value).subscribe((data:any) => {
        this.subCategories$ = data.sub_categories;
        this.error_message = '';
        }, (data:any) => this.error_message = data.error.message);
      }, (data:any) => this.error_message = data.error.message);
    }, (data:any) => {
      this.snackBar.open(data.error.message, null, {duration: 4000, verticalPosition: 'top'});
      this.error_message = data.error.message;
    });
  }
  deactiveCategory(categoryId: number) {
    this.settingsService.ToogleActiveCategory(false, this.searchField.value, categoryId).subscribe((data:any) => {
      this.settingsService.getCategories(this.active, this.searchField.value).subscribe((data:any) => {
      this.categories$ = data.categories;
      this.error_message = '';
      this.settingsService.getSubCategories(this.active, this.searchField.value).subscribe((data:any) => {
        this.subCategories$ = data.sub_categories;
        this.error_message = '';
        }, (data:any) => this.error_message = data.error.message);
      }, (data:any) => this.error_message = data.error.message);
    }, (data:any) => this.error_message = data.error.message);
  }
  activeSubCategory(subCategoryId: number) {
    this.settingsService.ToogleActiveSubCategory(true, this.searchField.value, subCategoryId).subscribe((data:any) => {
      this.settingsService.getSubCategories(this.active, this.searchField.value).subscribe((data:any) => {
      this.subCategories$ = data.sub_categories;
      this.error_message = '';
      }, (data:any) => this.error_message = data.error.message);
    }, (data:any) => {
      this.snackBar.open(data.error.message, null, {duration: 4000, verticalPosition: 'top'});
      this.error_message = data.error.message;
    });
  }
  deactiveSubCategory(subCategoryId: number) {
    this.settingsService.ToogleActiveSubCategory(false, this.searchField.value, subCategoryId).subscribe((data:any) => {
      this.settingsService.getSubCategories(this.active, this.searchField.value).subscribe((data:any) => {
      this.subCategories$ = data.sub_categories;
      this.error_message = '';
      }, (data:any) => this.error_message = data.error.message);
    }, (data:any) => this.error_message = data.error.message);
  }

  changeMonthlyLimit(currency_id: number, monthly_cost_limit: number) {
    this.settingsService.editActiveCurrenciesLimit(currency_id, monthly_cost_limit).subscribe((data:any) => {
      this.activeCurrencies$ = data.currencies;
      this.error_message = '';
      // this.settingsService.getActiveCurrenciesLimit(this.active, this.searchField.value).subscribe((data:any) => {
      // this.activeCurrencies$ = data.currencies;
      // this.error_message = '';
      // }, (data:any) => this.error_message = data.error.message);
    }, (data:any) => this.error_message = data.error.message);
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
