import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  constructor(private us: UserService) { }
  public adminEmail: string;
  ngOnInit() {
  }

  public thirdPartyLogin(method: string) {
    this.us.thirdPartyLoginDispatcher(method);
  }

  public grantPermission() {
    this.us.addAdminRole(this.adminEmail);
  }
}
