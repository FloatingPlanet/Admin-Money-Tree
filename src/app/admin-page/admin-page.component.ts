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
      title: 'Coupons',
      icon: 'star-outline',
      expanded: true,
      children: [
        {
          title: 'Coupons',
          link: '', // goes into angular `routerLink`
        },
      ],
    },
    {
      title: 'Orders',
      icon: 'car-outline',
      children: [
        {
          title: 'Orders',
          link: '', // goes into angular `routerLink`
        },
      ],
    },
    {
      title: 'Products',
      icon: 'cube-outline',
      children: [
        {
          title: 'Products',
          link: '', // goes into angular `routerLink`
        },

      ],
    },
    {
      title: 'Permission',
      icon: 'lock-outline',
      children: [
        {
          title: 'Permission',
          link: '', // goes into angular `routerLink`
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
