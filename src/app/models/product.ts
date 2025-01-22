export interface Product {
  id?: number,
  name: string,
  description: string,
  category_id: number,
  category_name?: string,
  quantity: number,
  quantity_sold?: number,
  price: number
}

export interface Category {
  id: number;
  name: string;
  status: number;
}
