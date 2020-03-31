import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-admin-permission',
  templateUrl: './admin-permission.component.html',
  styleUrls: ['./admin-permission.component.scss']
})
export class AdminPermissionComponent implements OnInit {
  public grantPermissionForm: FormGroup;
  public checked: boolean = false;
  constructor(private formBuilder: FormBuilder, private us: UserService
  ) { }

  ngOnInit(): void {
    this.grantPermissionForm = this.formBuilder.group({
      adminEmail1: [null, [Validators.required, Validators.email]],
      adminEmail2: ['', [Validators.required, Validators.email, this.identicalEmails('adminEmail1', 'adminEmail2')]]
    });
  }

  identicalEmails(firstControlName: string, secondControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const firstEmail = this.grantPermissionForm?.get(firstControlName).value;
      const secondEmail = this.grantPermissionForm?.get(secondControlName).value;
      return firstEmail === secondEmail ? null : { matched: control.value };
    };
  }

  public userAgree() {
    this.checked = !this.checked;
  }

  public proceedGrantPermission() {
    const firstEmail = this.grantPermissionForm?.get('adminEmail1').value;
    const secondEmail = this.grantPermissionForm?.get('adminEmail2').value;
    if (firstEmail === secondEmail && firstEmail !== '' && this.checked) {
      this.us.addAdminRole(firstEmail);
    } else {
      console.error('you naugty boy, requirements are not meet!');
    }
  }
}
