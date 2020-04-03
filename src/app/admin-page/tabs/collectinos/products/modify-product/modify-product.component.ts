import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.component.html',
  styleUrls: ['./modify-product.component.scss']
})
export class ModifyProductComponent implements OnInit {
  public selectedCategories: string[];
  public loading = false;

  constructor(private ps: ProductsService, private location: Location) { }

  ngOnInit(): void {
  }
  public categoriesInfo(categoriesFromChild: string[]) {
    console.log(categoriesFromChild + ' : I am parent, I got cats');
    this.selectedCategories = categoriesFromChild;
  }

  public productInfo(fg: FormGroup) {
    console.log(fg.value + ' : I am parent, I got detail');
    this.loading = true;
    // show loading spinner
    fg.patchValue({ productCategory: this.selectedCategories ? this.selectedCategories : [] });
    this.ps.addProduct(fg.value).then(result => {
      console.log(result);
      this.loading = false;
      setTimeout(() => {
        // jump back to previous page
        this.location.back();
      },
        500);
    }
    ).catch(error => console.error(error));
  }


}
