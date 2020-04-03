import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, ValidatorFn, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';
import { NbWindowRef, NbToastrService, NbGlobalPosition, NbGlobalPhysicalPosition } from '@nebular/theme';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  @Input() allCategories;
  public categoryForm: FormGroup;
  public loading = false;

  constructor(private formBuilder: FormBuilder, private cs: CategoryService, private ref: NbWindowRef, private ts: NbToastrService) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      category: [null, [Validators.required, this.existCategory()]],
    });
  }

  public addNewCategory() {
    this.loading = true;
    this.cs.addCategory(this.categoryForm.value).then(() => {
      setTimeout(() => {
        this.loading = false;
        this.ts.show(`Add category "${this.categoryForm.get('category').value}" succeded!`,
          'Add new category:',
          { position: NbGlobalPhysicalPosition.TOP_RIGHT, status: 'success', duration: 5000 });
        this.ref.close();
      }, 300);
    });
  }

  private existCategory(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const exist = [].some(x => x.category === control.value);
      return exist ? { existCategory: { value: control.value } } : null;
    };
  }
}
