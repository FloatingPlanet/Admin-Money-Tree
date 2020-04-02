import { Component, OnInit, ViewChild } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';
import { CouponsService } from 'src/app/services/coupons/coupons.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public loading = false;
  public coupons: Coupon[];
  public dataSource = new MatTableDataSource<Coupon>([]);

  public cols: string[] = ['select', 'coupon', 'discount', 'from', 'to', 'freeShipping', 'minimumSpend', 'amount', 'addedAt', 'edit'];
  public selection = new SelectionModel<Coupon>(true, []);
  private couponsObservable$: Subscription;

  constructor(private cs: CouponsService) {

  }

  ngOnInit() {
    this.loading = true;
    const loadCoupons = new Promise((resovle) => {
      this.couponsObservable$ = this.cs.couponsObservable.subscribe((coupons) => {
        this.coupons = coupons;
        this.dataSource = new MatTableDataSource<Coupon>(this.coupons);
        this.dataSource.paginator = this.paginator;
        resovle();
      })
    })
    loadCoupons.then(() => {
      this.loading = false;
    });


  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Coupon): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.coupon}`;
  }

  deleteCoupons() {
    this.selection.selected.forEach(element => {
      this.cs.deleteCoupons(element.coupon).then(() => {
      }
      );
    });
  }

  ngOnDestroy(): void {
    if (this.couponsObservable$) {
      this.couponsObservable$.unsubscribe();
    }
  }

}
