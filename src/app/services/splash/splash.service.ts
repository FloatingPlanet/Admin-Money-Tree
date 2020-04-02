import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { AuthenticatedGuard } from 'src/app/authenticated-guard/authenticated.guard';
import { CouponsService } from '../coupons/coupons.service';

@Injectable({
  providedIn: 'root'
})
export class SplashService {

  constructor() { }
  public initializeMyApp(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }
}
