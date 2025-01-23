import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "@services/product.service";
import {Category, Product} from "@models/product";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {TableDataSource} from "../../../../utils/data-source";
import {AlertService} from "@services/alert.service";
import {SpinnerService} from "@services/spinner.service";

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
  private alertService = inject(AlertService);
  private spinnerService = inject(SpinnerService);

  categories: Category[] = [];

  displayedColumns: string[] = ['id', 'name', 'category_name', 'quantity', 'quantity_sold', 'price', 'actions'];
  dataSource = new MatTableDataSource<Product>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  // Default filter criteria for each field
  nameFilter: string = '';
  categoryFilter: string = '';

  ngOnInit() {
    this.spinnerService.showSpinner();

    this.productService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;

        this.productService.getProducts().subscribe(
          (data: Product[]) => {
            this.dataSource.data = data;
            this.dataSource.paginator = this.paginator;
            this.dataSource.filterPredicate = this.createFilter();

            this.spinnerService.hideSpinner();
          },
          (error) => {
            this.spinnerService.hideSpinner();
          }
        );
      },
      (error) => {
        this.spinnerService.hideSpinner();
      }
    )
  }

  createFilter(): (data: any, filter: string) => boolean {
    const filterFunction = (data: any, filter: string) => {
      const filterArray = filter.split('|');
      const nameFilter = filterArray[0].toLowerCase();
      const categoryFilter = filterArray[1];
      // const cityFilter = filterArray[2].toLowerCase();

      // Apply individual field filters
      const matchesName = data.name.toLowerCase().includes(nameFilter);
      const matchesCategory = data.category_id.toString().includes(categoryFilter);
      // const matchesCity = data.city.toLowerCase().includes(cityFilter);

      // Return true if all conditions match
      return matchesName && matchesCategory;
    };

    return filterFunction;
  }

  applyFilter(): void {
    const filterValue = `${this.nameFilter}|${this.categoryFilter}`;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
