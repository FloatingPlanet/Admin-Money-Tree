import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

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
  public loginWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    this.thirdPartyLogin(provider);
  }
  public loginWithTwitter() {
    const provider = new firebase.auth.TwitterAuthProvider();
    this.thirdPartyLogin(provider);
  }
  public loginWithGithub() {
    const provider = new firebase.auth.GithubAuthProvider();
    this.thirdPartyLogin(provider);
  }

  public loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.thirdPartyLogin(provider);
  }

  public thirdPartyLogin(provider: firebase.auth.AuthProvider) {
    return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      return firebase.auth().signInWithPopup(provider).then((result) => {

      })
    }).catch((error) => { console.error(error); })

  }
  /*
  * end of login method
  */

  /*
  * grant admin permission
  */

  public addAdminRole(adminEmail: string) {
    var functions = firebase.functions();

    const grantPermission = functions.httpsCallable('grantPermission');
    grantPermission({
      email: adminEmail
    }).then((res) => {
      console.log(res);
    }).catch((error) => {
      console.error(error);
    })
  }

}
