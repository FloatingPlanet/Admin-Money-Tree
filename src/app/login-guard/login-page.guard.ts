import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class LoginPageGuard implements CanActivate {
  constructor(private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((result) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          return user.getIdTokenResult().then((tokenResult) => {
            if (tokenResult.claims.admin) {
              this.router.navigate(['']);
              result(false);
            } else {
              result(true);
            }
          }).catch(() => {

            result(true);
          })
        } else {
          result(true);
        }
      })
    })
  }

}
