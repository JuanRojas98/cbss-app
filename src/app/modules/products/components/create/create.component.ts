import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "@models/user";
import {ProductService} from "@services/product.service";
import {Category, Product} from "@models/product";

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit{
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private productService = inject(ProductService);

  categories: Category[] = [];

  productForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    category_id: [0, [Validators.required]],
    quantity: [1, [Validators.required, Validators.min(1)]],
    price: [1, [Validators.required]]
  });

  ngOnInit() {
    this.productService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      }
    );
  }

  onSubmit() {
    if (this.productForm.valid) {
      const product = this.productForm.value as Product;
      this.productService.createProduct(product).subscribe(
        (res: any) => {
          alert(res.message);
          this.productForm.reset();
        },
        (error) => {
          alert('Error al crear el producto.');
        }
      );
    }
    else {
      this.productForm.markAllAsTouched();
    }
  }
}
