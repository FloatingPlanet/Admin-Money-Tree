import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { NbDialogService } from '@nebular/theme';
import { PermissionGrantedModalComponent } from './permission-granted-modal/permission-granted-modal.component';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {

  public grantPermissionForm: FormGroup;
  public checked: boolean = false;
  constructor(private formBuilder: FormBuilder, private us: UserService, private ds: NbDialogService
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
    console.log('checked')
  }

  public proceedGrantPermission() {
    const firstEmail = this.grantPermissionForm?.get('adminEmail1').value;
    const secondEmail = this.grantPermissionForm?.get('adminEmail2').value;
    if (firstEmail === secondEmail && firstEmail !== '' && this.checked) {
      this.us.addAdminRole(firstEmail).then(() => {
        this.responseModal(secondEmail);
        this.grantPermissionForm.reset();
      }).catch((error) => {
        alert(`Please make sure ${secondEmail} has tries to log in Admin page once \n or make sure you have rights to add ADMIN`);
        console.error(error);
      })
    } else {
      console.error('you naugty boy, requirements are not meet!');
    }
  }
  responseModal(email: string) {
    this.ds.open(PermissionGrantedModalComponent, {
      context: {
        newAdmin: email,
      },
    });
  }
}
