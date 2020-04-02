// ****************** UI framework ******************//
import {
  NbDatepickerModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbCheckboxModule,
  NbActionsModule,
  NbCardModule,
  NbIconModule,
  NbThemeModule,
  NbSidebarModule,
  NbButtonModule,
  NbLayoutModule,
  NbSidebarService,
  NbMenuModule,
  NbListModule,
  NbMenuService,
  NbDialogService,
  NbDialogModule
} from '@nebular/theme';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from "@angular/router";
import { SignInComponent } from './sign-in/sign-in.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './services/user/user.service';
import { AuthenticatedGuard } from './authenticated-guard/authenticated.guard';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CouponsService } from './services/coupons/coupons.service';
import { AngularFireModule } from '@angular/fire';

// ****************** component ******************//
import { PermissionComponent } from './admin-page/tabs/account/admins/permission/permission.component';
import { CouponsComponent } from './admin-page/tabs/promotions/coupons/coupons.component';
import { AdminsComponent } from './admin-page/tabs/account/admins/admins.component';
import { PermissionGrantedModalComponent } from './admin-page/tabs/account/admins/permission/permission-granted-modal/permission-granted-modal.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminPageComponent,
    SignInComponent,
    PermissionComponent,
    AdminsComponent,
    CouponsComponent,
    PermissionGrantedModalComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    RouterModule,
    NbThemeModule.forRoot(),
    NbEvaIconsModule,
    NbLayoutModule,
    NbSidebarModule.forRoot(), // NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule,
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    NbIconModule,
    NbListModule,
    NbCardModule,
    NbActionsModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [
    UserService,
    CouponsService,
    AuthenticatedGuard,
    NbSidebarService,
    NbMenuService,
    NbDialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
