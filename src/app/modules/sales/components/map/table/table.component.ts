import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent} from "@angular/material/dialog";
import {Table} from "@models/table";
import {ProductService} from "@services/product.service";
import {Product} from "@models/product";
import {Shift} from "@models/shift";
import {ShiftService} from "@services/shift.service";
import {AuthService} from "@services/auth.service";
import {User} from "@models/user";
import {AlertService} from "@shared/services/alert.service";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogContent,
    ReactiveFormsModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit{
  private alertService = inject(AlertService);
  private formBuilder = inject(FormBuilder);
  private readonly _matDialog = inject(MAT_DIALOG_DATA);
  private productService = inject(ProductService);
  private shiftService = inject(ShiftService);
  private authService = inject(AuthService);

  table: Table = this._matDialog.data;
  products: Product[] = [];
  productsSale: Product[] = [];
  shift: Shift = JSON.parse(<string>this.shiftService.getCurrentShift());
  user: User = JSON.parse(<string>this.authService.getUser());

  saleForm = this.formBuilder.nonNullable.group({
    shift_id: [this.shift.id, [Validators.required]],
    table_id: [this.table.id, [Validators.required]],
    user_id: [this.user.id, [Validators.required]],
    state_id: [0, [Validators.required]],
    products: [[], [Validators.required]],
  });

  productsListForm = this.formBuilder.nonNullable.group({
    id: [1, [Validators.required]],
    quantity: [1, [Validators.required, Validators.min(1)]]
  })

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
      }
    );
  }

  getProductName(id?: number) {
    // console.log(id);
    // return 'Prueba';
  }

  addProductToList() {
    if (this.productsListForm.valid) {
      const productItem = this.productsListForm.value;
      this.products.filter(
        (prod) => {
          if (prod.id === productItem.id) {
            // @ts-ignore
            if (productItem.quantity > prod.quantity) {
              this.alertService.error('La cantidad ingresada supera la cantidad disponible del producto.');
            }
            else {
              // @ts-ignore
              this.productsSale.push(productItem);
              // @ts-ignore
              this.saleForm.value.products = this.productsSale;
            }
          }
        }
      );
    }
    else {
      this.productsListForm.markAllAsTouched();
    }
  }
}
