import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products/products.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public products: Product[];
  public dataSource = new MatTableDataSource<Product>([]);
  public cols: string[] = ['select', 'SKU', 'productName', 'productPrice', 'productQuantity', 'productCategory', 'productAddedAt', 'edit'];
  public selection = new SelectionModel<Product>(true, []);
  public loading = false;
  private productsObservable$: Subscription;


  constructor(private ps: ProductsService) {

  }

  ngOnInit() {
    this.loading = true;
    const loadProducts = new Promise((resolve) => {
      this.productsObservable$ = this.ps.productsObservable.subscribe((docs) => {
        this.products = docs;
        this.dataSource = new MatTableDataSource<Product>(this.products);
        this.dataSource.paginator = this.paginator;
        resolve();
      });
    });
    loadProducts.then(() => {
      this.loading = false;
    })
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

  checkboxLabel(row?: Product): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.SKU}`;
  }

  deleteProducts() {
    console.log(this.selection.selected);
    this.selection.selected.forEach(element => {
      this.ps.deleteProducts(element.SKU).then(res => {
        console.log(res);
      });
    });
  }

  ngOnDestroy(): void {
    if (this.productsObservable$) {
      this.productsObservable$.unsubscribe();
    }
  }
}
