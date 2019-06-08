import { Component, OnInit } from '@angular/core';
import { API_URL } from '../app.constants';
import { User } from '../model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { map, tap } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  url = API_URL;

  constructor(private router: ActivatedRoute, private userService: UserService, private autenticationService: AuthenticationService) { }

  ngOnInit() {
    this.router.data.pipe(map(data => data.user.user), tap(console.log)).subscribe(user => this.user = user);
  }

  image_selected (event) {
    let image = event.target.files[0];
    let formData = new FormData();
    formData.set("image", image);
    this.userService.saveUserPicture(formData).subscribe(image => this.user.image.file_name = image, console.log);
  }

}
