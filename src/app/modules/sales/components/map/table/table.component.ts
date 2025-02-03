import {Component, inject, OnInit} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators, ɵValue
} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent} from "@angular/material/dialog";
import {Table} from "@models/table";
import {ProductService} from "@services/product.service";
import {Product} from "@models/product";
import {Shift} from "@models/shift";
import {ShiftService} from "@services/shift.service";
import {AuthService} from "@services/auth.service";
import {User} from "@models/user";
import {AlertService} from "@shared/services/alert.service";
import {Form, ProductForm, Sale} from "@models/sale";
import {MatSelectChange} from "@angular/material/select";

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
  productListDet: Product[] = [];

  saleForm: Form = this.formBuilder.nonNullable.group({
    shift_id: [1, [Validators.required]],
    table_id: [1, [Validators.required]],
    user_id: [1, [Validators.required]],
    state_id: [1, [Validators.required]],
    products: this.formBuilder.array<ProductForm>([], [Validators.required]),
  });

  productForm = this.formBuilder.nonNullable.group({
    id: [1, [Validators.required]],
    quantity: [1, [Validators.required, Validators.min(1)]],
    price: [0]
  })

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (data: Product[])=> {
        this.products = data;
      }
    );
  }

  addProduct() {
    if (this.productForm.valid) {
      const {id, price, quantity} = this.productForm.value;
      let totalPrice = 0;

      let itemProductList = {
        name: '',
        quantity: quantity,
        price: totalPrice
      }

      this.products.filter((prod) => {
        if (this.productForm.value.id == prod.id) {
          itemProductList.name = prod.name;
          totalPrice = prod.price * (quantity || 0);
        }
      });

      itemProductList.price = totalPrice;

      let newProduct = this.formBuilder.group({
        id: id,
        quantity: quantity,
        price: totalPrice
      });

      // @ts-ignore
      this.productArray.push(newProduct);
      // @ts-ignore
      this.productListDet.push(itemProductList);
      this.productForm.reset();
    }
    else {
      this.productForm.markAllAsTouched();
    }
  }

  get productArray(): FormArray<ProductForm> {
    return this.saleForm.get('products') as FormArray<ProductForm>;
  }

  totalPriceProduct(event: any) {
    if (event.target.value != 0 && event.target.value != '') {
      let quantity = parseInt(event.target.value);
      const id = this.productForm.value.id;
      let totalPrice = 0;

      this.products.filter((prod) => {
        if (prod.id == id) {
          totalPrice = quantity * prod.price;
          this.productForm.value.price = totalPrice;
          console.log(this.productForm.value);
        }
      });
    }
    else {
      this.productForm.value.price = 0;
    }
  }

  save() {
    console.log(this.saleForm.value);
  }
}
