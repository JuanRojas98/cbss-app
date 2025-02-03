import {Product} from "@models/product";
import {FormArray, FormControl, FormGroup} from "@angular/forms";

export interface Sale {
  id: number;
  shift_id: number;
  table_id: number;
  user_id: number;
  state_id: number;
  products: Product[];
}

export type ProductForm = FormGroup<{
  id: FormControl<number>;
  quantity: FormControl<number>;
  price: FormControl<number>;
}>;

export type Form = FormGroup<{
  shift_id: FormControl<number>,
  table_id: FormControl<number>,
  user_id: FormControl<number>,
  state_id: FormControl<number>,
  products: FormArray<ProductForm>;
}>;
