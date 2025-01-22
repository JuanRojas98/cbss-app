import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "@services/product.service";
import {Category, Product} from "@models/product";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {TableDataSource} from "../../../../utils/data-source";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit{
  private productService = inject(ProductService);

  categories: Category[] = [];
  products: Product[] = [];

  displayedColumns: string[] = ['id', 'name', 'category_name', 'quantity', 'quantity_sold', 'price'];
  dataSource = new MatTableDataSource<Product>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        alert('Error al obtener lista de productos');
      }
    )
  }

  getCategoryList() {
    this.productService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      }
    )
  }

  filterProducts(value: any) {
    const data = value.target.value;
    value = data.trim(); // Remove whitespace
    value = data.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = data;
  }
}
