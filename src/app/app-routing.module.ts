import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthenticatedGuard } from './authenticated-guard/authenticated.guard';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminPermissionComponent } from './admin-page/admin-admins/admin-permission/admin-permission.component';
import { AdminAdminsComponent } from './admin-page/admin-admins/admin-admins.component';


const routes: Routes = [
  {
    path: '', component: AdminPageComponent, canActivate: [AuthenticatedGuard],
    children: [
      { path: 'users/admin/admins', component: AdminAdminsComponent },
      { path: 'users/admin/permission', component: AdminAdminsComponent },
    ]
  },
  { path: 'login', component: SignInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
