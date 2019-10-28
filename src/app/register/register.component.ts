import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {City, Country, EditProfile, RegisterRequest, SaveNewPasswordRequest} from '../model';
import {map} from 'rxjs/operators';
import {API_URL} from '../app.constants';
import {HttpClient} from '@angular/common/http';
import {RegisterService} from '../services/register.service';
import {CityResolver, CountryResolver} from '../services/country.service';
import {MatDateFormats, MatDialog, MatSnackBar} from '@angular/material';
import DateTimeFormat = Intl.DateTimeFormat;
import {DialogShowBillComponent} from '../bills/show-bill.component';
import {DialogRegisterConfirmationComponent} from './register-confirmation.component';
import {error} from '@angular/compiler/src/util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  //regRequest: any; // = new RegisterRequest();

  countries$: Observable<Country[]>;
  cities$: Observable<City[]>;
  passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  regRequest: RegisterRequest = new RegisterRequest(null, null, null, null, null, null, null, null, null, null);

  constructor(public cityService: CityResolver, public router: ActivatedRoute, public registerService: RegisterService, public dialog: MatDialog, public loginRouter: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.countries$ = this.router.data.pipe(map(data => data.countries));
  }

  registerSubmit(reqData: any) {
    let finalBirthDate = '';
    let originDate = '';
    originDate = reqData.birthDate

    const bDate = new Date(reqData.birthDate);
    // let dateStr = mydate.toString("MMMM yyyy");
    const finalDate = bDate.toISOString();
    // reqData.birthDate = reqData.birthDate.replace("/","-");
    // if (regRequest.birthDate) {
    //   // originDate = regRequest.birthDate
    //   //
    //   // let birthDateFormat = regRequest.birthDate.toLocaleDateString().replace("/","-");
    //   // birthDateFormat = birthDateFormat.replace("/","-");
    //   // birthDateFormat = birthDateFormat.split('-');
    //   // finalBirthDate = finalBirthDate + birthDateFormat[2] + '-' + birthDateFormat[1] + '-' + birthDateFormat[0];
    //   // regRequest.birthDate = finalBirthDate;
    // }
    if (reqData.password != reqData.confirmPassword) {
      this.snackBar.open('Passwords need be same!', null, {duration: 4000, verticalPosition: 'top'});
    }
    else {
      this.registerService.register(reqData.address, finalDate, reqData.city_id, reqData.confirmPassword, reqData.email, reqData.firstName, reqData.gender, reqData.lastName, reqData.password, reqData.country_id).subscribe((data: any) => {
        this.openDialogRegisterConfirmation();
      }, (data: any) => {
        if (data.error.message === "Password is not valid!")  {
          this.snackBar.open('Password should be atleast 8 characters long\n' +
            '            and should contain one number,one character and one special\n' +
            '            character', null, {duration: 4000, verticalPosition: 'top'});
        }
        else {
          this.snackBar.open(data.error.message, null, {duration: 4000, verticalPosition: 'top'});
        }
      }
      );
    }
  }


  onCountryChange(event) {
    const countryId = event.value;
    this.cityService.resolve(countryId).subscribe((data:any) => this.cities$ = data.cities);
  }

  openDialogRegisterConfirmation(): void {
    const dialogRef = this.dialog.open(DialogRegisterConfirmationComponent, {
      //width: '300px',
      disableClose: true,
      data: {
      }
    });

    dialogRef.afterClosed().pipe(
      map(((data: any) => data)))
      .subscribe((result: any) => {
        this.loginRouter.navigate(['login']);
    });
  }

}
