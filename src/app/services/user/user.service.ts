import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private router: Router) { }

  public login(email: string, pwd: string) {
    firebase.auth().signInWithEmailAndPassword(email, pwd).then((res) => {
      res.user.getIdTokenResult
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

  /*
  * third party login
  */
  public thirdPartyLoginDispatcher(method: string) {
    let provider: firebase.auth.AuthProvider;

    switch (method) {
      case 'facebook':
        provider = new firebase.auth.FacebookAuthProvider();
        break;
      case 'twitter':
        provider = new firebase.auth.TwitterAuthProvider();
        break;
      case 'github':
        provider = new firebase.auth.GithubAuthProvider();
        break;
      case 'google':
        provider = new firebase.auth.GoogleAuthProvider();
        break;

      default:
        break;
    }
    this.thirdPartyLogin(provider).then((res) => {
      res.user.getIdTokenResult().then((user) => {
        if (user.claims.admin) {
          this.router.navigate(['']);
        } else {
          console.error('you are not admin')
        }
      })
    }).catch((error) => {
      console.error(error);
    });

  }
  public thirdPartyLogin(provider: firebase.auth.AuthProvider) {
    return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      return firebase.auth().signInWithPopup(provider).then((result) => {
        return result;
      })
    }).catch((error) => {
      console.error(error);
      return error;
    })
  }
  /*
  * end of login method
  */

  /*
  * logout
  */
  public logout() {
    return firebase.auth().signOut().then(() => {
      console.log('you signed out');
    }).catch((error) => {
      console.error(error);
      return error;
    })
  }
  /*
  * grant admin permission
  */
  public addAdminRole(adminEmail: string) {
    return new Promise((resolve, reject) => {
      var functions = firebase.functions();
      const grantPermission = functions.httpsCallable('grantPermission');
      grantPermission({
        email: adminEmail
      }).then((res) => {
        resolve();
      }).catch((error) => {
        console.error(error);
        reject(error);
      })
    })

  }

}
