import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public adminEmail: string = '';
  constructor(private us: UserService) { }

  ngOnInit() {
  }


  public thirdPartyLogin(method: string) {
    this.us.thirdPartyLoginDispatcher(method);

  }
}
