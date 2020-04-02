import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthenticatedGuard } from './authenticated-guard/authenticated.guard';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { PermissionComponent } from './admin-page/tabs/account/admins/permission/permission.component';
import { AdminsComponent } from './admin-page/tabs/account/admins/admins.component';
import { CouponsComponent } from './admin-page/tabs/promotions/coupons/coupons.component';
import { CouponFormComponent } from './admin-page/tabs/promotions/coupons/coupon-form/coupon-form.component';
import { AdminIndexComponent } from './admin-page/admin-index/admin-index.component';


const routes: Routes = [
  {
    path: '', component: AdminPageComponent, canActivate: [AuthenticatedGuard],
    children: [
      { path: 'home', component: AdminIndexComponent },
      /*
      * account tab
      */

      { path: 'accounts/admins', component: AdminsComponent },
      { path: 'accounts/admins/permission', component: PermissionComponent },

      /*
      * promotions
      */
      { path: 'promotions/coupons', component: CouponsComponent },
      { path: 'promotions/coupons/add', component: CouponFormComponent },
      { path: 'promotions/coupons/modify/:coupon', component: CouponFormComponent },
    ]
  },
  { path: 'login', component: SignInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
