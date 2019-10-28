import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AuthenticationRequest } from '../model';
import {RestartPasswordService} from '../services/restart-password.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  message: string;
  userActive: boolean = true;
  authentcationRequest: AuthenticationRequest = null;
  userEmail = '';
  howApplicationWorks = false;

  constructor(public authService: AuthenticationService, public router: Router, public passwordService: RestartPasswordService, private snackBar: MatSnackBar) { }
  //constructor() { }

  ngOnInit() {
  }

  login(email: string, password: string) {
    if (email != '') {
      this.userEmail = email;
    }
    let request = new AuthenticationRequest(email, password);
    this.authService.authenticate(request)
      .subscribe(res => this.router.navigate(['dashboard']),
        err => {
          if (err.message) {
            this.snackBar.open(err.message, null, {duration: 4000, verticalPosition: 'top'});
            // this.message = err.message;
          } else {
            this.authentcationRequest = new AuthenticationRequest(err.email, err.password);
            this.userActive = false;
          }
        });
  }

  activateUser(code: string) {
    if (this.authentcationRequest) {
      this.authentcationRequest.code = code;
      this.authService.authenticate(this.authentcationRequest)
        .subscribe(res => this.router.navigate(['dashboard']), console.log);
    }
  }

  /*signIn(username: string, password: string) {
    console.log(username, password)
  }*/

  restartPassword(email: string) {
    this.passwordService.restartLoginCode(email).subscribe((data:any) => {
    }, (data:any) => {});
  }

  toogleShow() {
    if (this.howApplicationWorks === false) {
      this.howApplicationWorks = true;
    }
    else {
      this.howApplicationWorks = false;
    }
  }

}


