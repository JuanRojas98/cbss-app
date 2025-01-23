import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "@models/user";
import {ProductService} from "@services/product.service";
import {Category, Product} from "@models/product";
import {SpinnerService} from "@services/spinner.service";
import {AlertService} from "@services/alert.service";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit{
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private productService = inject(ProductService);
  private alertService = inject(AlertService);
  private spinnerService = inject(SpinnerService);

  categories: Category[] = [];

  productForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    category_id: [0, [Validators.required]],
    quantity: [1, [Validators.required, Validators.min(1)]],
    price: [1, [Validators.required, Validators.min(1)]]
  });

  ngOnInit() {
    this.spinnerService.showSpinner();
    this.productService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
        this.spinnerService.hideSpinner();
      }
    );
  }

  onSubmit() {
    if (this.productForm.valid && this.productForm.value.category_id != 0) {
      this.alertService.waiting('Procesando información.');

      const product = this.productForm.value as Product;
      this.productService.createProduct(product).subscribe(
        (res: any) => {
          this.alertService.success(res.message);
          this.productForm.reset();
        }
      );
    }
    else {
      this.productForm.markAllAsTouched();
    }
  }
}
