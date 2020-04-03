import { Component, OnInit } from '@angular/core';
import { FormGroup, ValidatorFn, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  public categoryForm: FormGroup;
  public loading = false;

  constructor(private formBuilder: FormBuilder, private cs: CategoryService, ) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      category: [null, [Validators.required, this.existCategory()]],
    });
  }

  public addNewCategory() {
    this.loading = true;
    // show loading spinner
    this.cs.addCategory(this.categoryForm.value).then((res) => {
      setTimeout(() => {
        this.loading = false;
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
}
