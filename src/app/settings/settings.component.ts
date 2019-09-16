import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription, zip} from 'rxjs';
import {BillCategory, BillSubCategory, Currency} from '../model';
import {Router} from '@angular/router';
import {SettingsService} from '../services/settings.service';
import {MatSnackBar} from '@angular/material';
import {FormControl} from '@angular/forms';
import {debounce, debounceTime, flatMap} from 'rxjs/operators';

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
  constructor(public settingsService: SettingsService, public router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    let currencies = (searchValues: string) => this.settingsService.getCurrencies(this.active, searchValues);
    let categories = (searchValues: string) => this.settingsService.getCategories(this.active, searchValues);
    let subCategories = (searchValues: string) => this.settingsService.getSubCategories(this.active, searchValues);
    currencies('').subscribe((data:any) => {
      this.currencies$ = data.currencies;
    }, (data:any) => this.error_message = data.error.message);
    categories('').subscribe((data:any) => {
      this.categories$ = data.categories;
    }, (data:any) => this.error_message = data.error.message);
    subCategories('').subscribe((data:any) => {
      this.subCategories$ = data.sub_categories;
    }, (data:any) => this.error_message = data.error.message);
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
      this.currencies$ = data[0].currencies;
      this.categories$ = data[1].categories;
      this.subCategories$ = data[2].sub_categories;
    });
  }

  ngOnDestroy() {
    this.subSubscription.unsubscribe();
  }

  handleError(message: string) {
    console.log(message)
    this.snackBar.open(message, null, {duration: 4000});
    this.error_message = message;
  }
  changeActive() {
    console.log("Acccc");
    this.active = !this.active;
    this.settingsService.getCurrencies(this.active, this.searchField.value).subscribe((data:any) => {
      this.currencies$ = data.currencies;
    }, (data:any) => this.error_message = data.error.message);
    this.settingsService.getCategories(this.active, this.searchField.value).subscribe((data:any) => {
      this.categories$ = data.categories;
    }, (data:any) => this.error_message = data.error.message);
    this.settingsService.getSubCategories(this.active, this.searchField.value).subscribe((data:any) => {
      this.subCategories$ = data.sub_categories;
    }, (data:any) => this.error_message = data.error.message);
  }
  activeCurrency(currencyId: number) {
    console.log(this.searchField.value);
    this.settingsService.ToogleActiveCurrency(true, this.searchField.value, currencyId).subscribe((data:any) => {
      this.settingsService.getCurrencies(this.active, this.searchField.value).subscribe((data:any) => {
      this.currencies$ = data.currencies;
      this.error_message = '';
      }, (data:any) => this.error_message = data.error.message);
    }, (data:any) => this.error_message = data.error.message);
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
    console.log(this.searchField.value);
    this.settingsService.ToogleActiveCategory(true, this.searchField.value, categoryId).subscribe((data:any) => {
      this.settingsService.getCategories(this.active, this.searchField.value).subscribe((data:any) => {
      this.categories$ = data.categories;
      this.error_message = '';
      }, (data:any) => this.error_message = data.error.message);
      this.settingsService.getSubCategories(this.active, this.searchField.value).subscribe((data:any) => {
      this.subCategories$ = data.sub_categories;
      this.error_message = '';
      }, (data:any) => this.error_message = data.error.message);
    }, (data:any) => this.error_message = data.error.message);
  }
  deactiveCategory(categoryId: number) {
    this.settingsService.ToogleActiveCategory(false, this.searchField.value, categoryId).subscribe((data:any) => {
      this.settingsService.getCategories(this.active, this.searchField.value).subscribe((data:any) => {
      this.categories$ = data.categories;
      this.error_message = '';
      }, (data:any) => this.error_message = data.error.message);
    }, (data:any) => this.error_message = data.error.message);
  }
  activeSubCategory(subCategoryId: number) {
    console.log(this.searchField.value);
    this.settingsService.ToogleActiveSubCategory(true, this.searchField.value, subCategoryId).subscribe((data:any) => {
      this.settingsService.getSubCategories(this.active, this.searchField.value).subscribe((data:any) => {
      this.subCategories$ = data.sub_categories;
      this.error_message = '';
      }, (data:any) => this.error_message = data.error.message);
    }, (data:any) => this.error_message = data.error.message);
  }
  deactiveSubCategory(subCategoryId: number) {
    this.settingsService.ToogleActiveSubCategory(false, this.searchField.value, subCategoryId).subscribe((data:any) => {
      this.settingsService.getSubCategories(this.active, this.searchField.value).subscribe((data:any) => {
      this.subCategories$ = data.sub_categories;
      this.error_message = '';
      }, (data:any) => this.error_message = data.error.message);
    }, (data:any) => this.error_message = data.error.message);
  }
}