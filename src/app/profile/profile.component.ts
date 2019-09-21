import { Component, OnInit, Inject } from '@angular/core';
import { API_URL } from '../app.constants';
import { User } from '../model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { map, tap } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogChangePasswordComponent} from './change_password';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  url = API_URL;
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  constructor(private router: ActivatedRoute, private userService: UserService, private autenticationService: AuthenticationService, public dialog: MatDialog) { }

  ngOnInit() {
    this.router.data.pipe(map(data => data.user.user), tap(console.log)).subscribe(user => this.user = user);
  }

  image_selected (event) {
    let image = event.target.files[0];
    let formData = new FormData();
    formData.set("image", image);
    this.userService.saveUserPicture(formData).subscribe(image => this.user.image.file_name = image, console.log);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogChangePasswordComponent, {
      width: '250px',
      data: {currentPassword: this.currentPassword, newPassword: this.newPassword, confirmPassword: this.confirmPassword}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.newPassword = result;
    });
  }

}
