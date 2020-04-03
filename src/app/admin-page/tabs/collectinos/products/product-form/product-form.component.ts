import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ValidatorFn, AbstractControl } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})

export class ProductFormComponent implements OnInit, OnDestroy {

  public SKU: string;
  public productForm: FormGroup;
  public categoryForm: FormGroup;

  public product: Product;
  public notEditable = false;
  public imagesUrls = [];
  public allCategories: Category[];
  private categoriesObservable$: Subscription;
  public succeeded = false;
  public selectedCats = [];

  constructor(private formBuilder: FormBuilder, private cs: CategoryService, private ps: ProductsService, private route: ActivatedRoute) {

  }


  ngOnInit() {
    this.initForm();
    this.SKU = this.route.snapshot.paramMap.get('SKU');
    if (this.SKU) {
      this.ps.fetchProduct(this.SKU).then(result => {
        this.notEditable = !this.notEditable;
        this.product = result as Product;
        this.getProductImageUrls.clear();
        this.product.productImageUrls.forEach((item: any) => {
          this.getProductImageUrls.push(this.formBuilder.group({ url: item.url }));
        });
        this.productForm.patchValue({
          SKU: this.product.SKU,
          productId: this.product.productId,
          productName: this.product.productName,
          productCategory: this.product.productCategory,
          productSummary: this.product.productSummary,
          productPrice: this.product.productPrice,
          productDescription: this.product.productDescription,
          productAddedAt: this.product.productAddedAt,
          productQuantity: this.product.productQuantity,
          ratings: this.product.ratings,
          favourite: this.product.favourite,
          productSeller: this.product.productSeller,
        });
        console.log(this.productForm.controls.SKU.value);
        console.log(this.getProductImageUrls);
      }).catch(error => console.error(error));
    }
    this.categoriesObservable$ = this.cs.categoriesObservableAdmin.subscribe((res) => {
      this.allCategories = res;
    });
  }

  public onSubmitProduct() {
    this.ps.addProduct(this.productForm.value).then(() => {
      console.log('product added');
    });
  }

  private initForm() {
    this.productForm = this.formBuilder.group({
      SKU: [null, Validators.required],
      productId: [null, Validators.required],
      productName: [null, Validators.required],
      productCategory: [[]],
      productSummary: null,
      productPrice: [null, Validators.required],
      productDescription: [null, Validators.required],
      productImageUrls: this.formBuilder.array(
        [this.formBuilder.group({ url: '' })]),
      productAddedAt: new Date(),
      productQuantity: [null, [Validators.required, Validators.pattern('\\d*')]],
      ratings: [null, Validators.required],
      favourite: false,
      productSeller: null,
    });

    this.categoryForm = this.formBuilder.group({
      category: [null, [Validators.required, this.existCategory()]],
    });
  }

  get getProductImageUrls() {
    return this.productForm.get('productImageUrls') as FormArray;
  }

  public addUrl() {
    this.getProductImageUrls.push(this.formBuilder.group({ url: '' }));
  }

  public deleteUrl(index) {
    this.getProductImageUrls.removeAt(index);
  }

  public addNewCategory() {
    this.succeeded = true;
    // show loading spinner
    this.cs.addCategory(this.categoryForm.value).then((res) => {
      setTimeout(() => {
        this.succeeded = false;
      }, 300);
    });
    this.categoryForm.reset();
  }

  private existCategory(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const exist = this.cs.allCategories.some(x => x.category === control.value);
      return exist ? { existCategory: { value: control.value } } : null;
    };
  }

  ngOnDestroy(): void {
    if (this.categoriesObservable$) {
      this.categoriesObservable$.unsubscribe();
    }
  }
}