import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AuthenticationRequest } from '../model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  message: string;
  userActive: boolean = true;
  authentcationRequest: AuthenticationRequest = null;

  constructor(public authService: AuthenticationService, public router: Router) { }
  //constructor() { }

  ngOnInit() {
  }

  login(email: string, password: string) {
    let request = new AuthenticationRequest(email, password);
    this.authService.authenticate(request)
      .subscribe(res => this.router.navigate(['dashboard']),
        err => {
          if (err.message) {
            this.message = err.message;
          }
          else {
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

}


