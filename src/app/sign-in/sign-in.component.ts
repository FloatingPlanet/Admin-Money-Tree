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

  public grantPermission() {
    this.us.addAdminRole(this.adminEmail);
  }

  public thirdPartyLogin(method: string) {
    switch (method) {
      case 'facebook':
        this.us.loginWithFacebook();

        break;
      case 'twitter':
        this.us.loginWithTwitter();

        break;
      case 'github':
        this.us.loginWithGithub();

        break;
      case 'google':
        this.us.loginWithGoogle();

        break;

      default:
        break;
    }
  }
}
