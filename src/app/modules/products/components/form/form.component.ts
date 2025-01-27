import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent} from "@angular/material/dialog";
import {ProductService} from "@services/product.service";
import {AlertService} from "@shared/services/alert.service";
import {ModalService} from "@shared/services/modal.service";
import {Category, Product} from "@models/product";
import {GridService} from "@shared/services/grid.service";

@Component({
  selector: 'app-form',
  standalone: true,
    imports: [
        FormsModule,
        MatDialogContent,
        ReactiveFormsModule
    ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  private formBuilder = inject(FormBuilder);
  private readonly _matDialog = inject(MAT_DIALOG_DATA);
  private productService = inject(ProductService);
  private alertService = inject(AlertService);
  private modalService = inject(ModalService);
  private gridService = inject(GridService);

  categories: Category[] = [];

  productForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    category_id: [0, [Validators.required]],
    quantity: [1, [Validators.required, Validators.min(1)]],
    price: [1, [Validators.required, Validators.min(1)]]
  });

  ngOnInit() {
    this.productService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
        this.productForm.patchValue(this._matDialog.data);
      }
    );
  }

  onSubmit() {
    if (this.productForm.valid && this.productForm.value.category_id != 0) {
      this.alertService.waiting('Procesando información.');
      const product = this.productForm.value as Product;

      if (! this._matDialog.data) {
        this.productService.createProduct(product).subscribe(
          (res: any) => {
            this.alertService.success(res.message);
            this.modalService.closeModal();
            this.productForm.reset();

            this.gridService.refreshGrid();
          }
        );
      }
      else {
        this.productService.updateProduct(this._matDialog.data.id, product).subscribe(
          (res: any) => {
            this.alertService.success(res.message);
            this.modalService.closeModal();
            this.productForm.reset();

            this.gridService.refreshGrid();
          }
        );
      }
    }
    else {
      this.productForm.markAllAsTouched();
    }
  }

  getTitle() {
    return this._matDialog.data ? 'Editar producto' : 'Crear producto';
  }

  getTitleButton() {
    return this._matDialog.data ? 'Actualizar' : 'Crear';
  }
}
