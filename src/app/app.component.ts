import { Component } from '@angular/core';
import * as firebase from 'firebase'
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'admin-money-tree';
  app = firebase.initializeApp(environment.firebaseConfig);
}
