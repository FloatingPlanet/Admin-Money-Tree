import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme'

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
      icon: 'menu-outline',
      expanded: true,
      children: [
        {
          title: 'Coupons',
          icon: 'star-outline'
        },

      ],
    },
    {
      title: 'Orders',
      icon: 'menu-outline',

      children: [
        {
          title: 'Orders',
          icon: 'car-outline',

        },

      ],
    },
    {
      title: 'Products',
      icon: 'menu-outline',

      children: [
        {
          title: 'Products',
          icon: 'cube-outline'
        },

      ],
    },
    {
      title: 'Permission',
      icon: 'menu-outline',

      children: [
        {
          title: 'Permission',
          icon: 'lock-outline',

        },

      ],
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
