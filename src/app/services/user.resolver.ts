import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../model';
import { UserService } from './user.service';
import { Observable } from 'rxjs';



@Injectable({ providedIn: "root" })
export class UserResolver implements Resolve<User> {
  constructor(public user_service: UserService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User> {
    return this.user_service.find_by_id();
  }
}
