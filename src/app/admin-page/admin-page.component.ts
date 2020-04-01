import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme'
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  public showFiller = true;
  items: NbMenuItem[] = [
    {
      title: 'Accounts',
      icon: 'people-outline',
      expanded: true,

      children: [

        {
          title: 'Admins',
          link: '/accounts/admins', // goes into angular `routerLink`
        },
        {
          title: 'Customers',
          link: '/users/customers', // goes into angular `routerLink`
        }
      ],
    },
    {
      title: 'Orders',
      icon: 'car-outline',
      children: [
        {
          title: 'Active Orders',
          link: '/orders/active-orders', // goes into angular `routerLink`
        },
        {
          title: 'Completed Orders',
          link: '/orders/completed-orders', // goes into angular `routerLink`
        },
      ],
    },
    {
      title: 'Collections',
      icon: 'cube-outline',
      children: [
        {
          title: 'Products',
          link: '/collections/products', // goes into angular `routerLink`
        },
        {
          title: 'Categories',
          link: '/collections/catogories', // goes into angular `routerLink`
        },

      ],
    },

    {
      title: 'Promotions',
      icon: 'star-outline',
      children: [
        {
          title: 'Coupons',
          link: '/promotions/coupons', // goes into angular `routerLink`
        },
      ],
    },
  ];
  constructor(private us: UserService, private sidebarService: NbSidebarService) { }

  ngOnInit() {
  }
  public logout() {
    this.us.logout();
  }
  public toggleSideBar() {
    this.sidebarService.toggle(true, 'left');
  }
}
