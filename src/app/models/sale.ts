import {Product} from "@models/product";

export interface Sale {
  id: number;
  shift_id: number;
  table_id: number;
  user_id: number;
  state_id: number;
  products: Product[];
}
