import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private us: UserService, private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((result) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          return user.getIdTokenResult().then((tokenResult) => {
            if (tokenResult.claims.admin) {
              result(true);
            } else {
              this.router.navigate(['login']);
              result(false);
            }
          }).catch(() => {
            this.router.navigate(['login']);

            result(false);
          })
        } else {
          this.router.navigate(['login']);
          result(false);
        }
      })
    })
  }

}
