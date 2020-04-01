import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthenticatedGuard } from './authenticated-guard/authenticated.guard';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { PermissionComponent } from './admin-page/tabs/admin-admins/account/permission/permission.component';
import { AccountComponent } from './admin-page/tabs/admin-admins/account/account.component';


const routes: Routes = [
  {
    path: '', component: AdminPageComponent, canActivate: [AuthenticatedGuard],
    children: [
      { path: 'users/admin/admins', component: AccountComponent },
      { path: 'users/admin/permission', component: PermissionComponent },
    ]
  },
  { path: 'login', component: SignInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
