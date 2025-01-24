import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent} from "@angular/material/dialog";
import {ProductService} from "@services/product.service";
import {AlertService} from "@services/alert.service";
import {ModalService} from "@shared/services/modal.service";
import {TableService} from "@shared/services/table.service";
import {Category} from "@models/product";

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
export class FormComponent implements OnInit{
  private formBuilder = inject(FormBuilder);
  private readonly _matDialog = inject(MAT_DIALOG_DATA);
  private productService = inject(ProductService);
  private alertService = inject(AlertService);
  private modalService = inject(ModalService);
  private tableService = inject(TableService);

  categoryForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    status: [1, [Validators.required]]
  });

  ngOnInit() {
    this.categoryForm.patchValue(this._matDialog.data);
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const category = this.categoryForm.value as Category;

      if (! this._matDialog.data) {
        this.productService.createCategory(category).subscribe(
          (res: any) => {
            this.alertService.success(res.message);
            this.modalService.closeModal();
            this.categoryForm.reset();

            this.tableService.refreshTable();
          }
        );
      }
      else {
        this.productService.updateCategory(this._matDialog.data.id, category).subscribe(
          (res: any) => {
            this.alertService.success(res.message);
            this.modalService.closeModal();
            this.categoryForm.reset();

            this.tableService.refreshTable();
          }
        );
      }
    }
    else {
      this.categoryForm.markAllAsTouched();
    }
  }

  getTitle() {
    return this._matDialog.data ? 'Editar categoría' : 'Crear categoría';
  }

  getTitleButton() {
    return this._matDialog.data ? 'Actualizar' : 'Crear';
  }
}
