import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { promise } from 'protractor';
import { resolve } from 'dns';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private router: Router) { }

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
    return new Promise((resolve, reject) => {
      this.thirdPartyLogin(provider).then((res) => {
        res.user.getIdTokenResult().then((user) => {
          if (user.claims.admin) {
            resolve();
          } else {
            this.authenticationNotMet();
          }
        })
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        reject();
      })
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
  public logInWithEmail(fg: FormGroup) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(fg.value.email, fg.value.pwd).then((res) => {
        res.user.getIdTokenResult().then((user) => {
          if (user.claims.admin) {
            resolve();
          } else {
            this.authenticationNotMet();
          }
        })
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        reject();
      })
    })
  }
  /*
  * email login
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
      const functions = firebase.functions();
      const grantPermission = functions.httpsCallable('grantPermission');
      grantPermission({
        granteeEmail: adminEmail,
        granterEmail: firebase.auth().currentUser.email
      }).then((res) => {
        if (res.data.set) {
          resolve();
        } else {
          reject(`${adminEmail} does not exist in database`);
        }
        console.log(res);
      }).catch((error) => {
        console.error(error);
        reject(error);
      })
    })
  }

  private authenticationNotMet() {
    alert("You are not admin! \nContact admin to grant you permission!");
    console.error('you are not admin')
  }
}

