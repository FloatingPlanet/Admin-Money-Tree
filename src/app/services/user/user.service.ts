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
}
