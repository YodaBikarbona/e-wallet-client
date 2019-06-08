import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RestartPasswordRequest} from '../model';
import {RestartPasswordService} from '../services/restart-password.service';

@Component({
  selector: 'app-restart-password',
  templateUrl: './restart-password.component.html',
  styleUrls: ['./restart-password.component.scss']
})
export class RestartPasswordComponent implements OnInit, OnDestroy {

  restart = false;
  restart_code = false;
  email = '';
  error_message = '';
  restartRequest: RestartPasswordRequest = null;

  constructor(public passwordService: RestartPasswordService, public router: Router) {
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
  }

  restartPassword(email: string) {
    this.passwordService.restartPassword(email).subscribe((data:any) => {
      this.restart = true;
      this.email = email;
      this.error_message = '';
    }, (data:any) => this.error_message = data.error.message);
  }

  restartPasswordCode(code: string, email: string) {
    this.passwordService.restartPasswordCode(code, email).subscribe((data:any) => {
      this.restart_code = true;
      this.error_message = '';
    }, (data:any) => this.error_message = data.error.message);
  }

  saveNewPassword(password: string, confirmPassword: string, email: string) {
    if (password != confirmPassword) {
      this.error_message = 'Passwords are not same!';
    }
    else {
      this.passwordService.saveNewPassword(password, confirmPassword, email).subscribe((data: any) => this.router.navigate(['login']), (data:any) => this.error_message = data.error.message);
    }
  }
}
