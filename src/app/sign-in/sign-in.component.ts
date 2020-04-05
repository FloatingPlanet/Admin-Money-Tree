import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public loginForm: FormGroup;


  constructor(private us: UserService, private formBuilder: FormBuilder) { }
  public adminEmail: string;
  public rememberMe: boolean = false;
  ngOnInit() {
    this.formInit();
  }

  public formInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.email],
      pwd: [null, Validators.required]
    })
  }

  public emailLogin() {
    this.us.logInWithEmail(this.loginForm, this.rememberMe).then(() => { console.log(this.rememberMe) }).catch((error) => {
    });
  }

  public thirdPartyLogin(method: string) {
    this.us.thirdPartyLoginDispatcher(method);
  }

  public grantPermission() {
    this.us.addAdminRole(this.adminEmail);
  }
}
