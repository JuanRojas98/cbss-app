import {AfterViewInit, Component, DestroyRef, inject, OnInit, signal, ViewChild} from '@angular/core';
import {ProductService} from "@services/product.service";
import {Category, Product} from "@models/product";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {AlertService} from "@shared/services/alert.service";
import {SpinnerService} from "@shared/services/spinner.service";
import {GridComponent} from "@shared/components/grid/grid.component";
import {Action} from "@shared/models/grid";
import {ModalService} from "@shared/services/modal.service";
import {GridService} from "@shared/services/grid.service";
import {FormComponent} from "@modules/products/components/form/form.component";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    GridComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit{
  private productService = inject(ProductService);
  private spinnerService = inject(SpinnerService);
  private modalService = inject(ModalService);
  private gridService = inject(GridService);

  refreshData = false;

  constructor() {
  }

  categories: Category[] = [];
  products: Product[] = [];

  displayedColumns = ['id', 'name', 'category_name', 'quantity', 'quantity_sold', 'price', 'actions'];
  headers = ['ID', 'Producto', 'Categoría', 'Cantidad actual', 'Cantidad vendida', 'Precio por unidad', ''];
  sortables = ['id'];

  // Default filter criteria for each field
  nameFilter: string = '';
  categoryFilter: string = '';

  ngOnInit() {
    this.spinnerService.showSpinner();
    this.getProducts();

    this.gridService.refresh$.subscribe((refresh: boolean) => {
      if (refresh) {
        this.getProducts();
      }
    });
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe(
        (data: Product[]) => {
          this.products = data;
          this.spinnerService.hideSpinner();
        },
        (error) => {
          this.spinnerService.hideSpinner();
        }
      );
  }

  getAction(actionTable: Action) {
    switch (actionTable.action) {
      case 'edit':
        const product: Product[] = this.products.filter((prod) => prod.id === actionTable.id);
        this.editForm(product[0]);
        break;
      case 'view':
        break;
      default:
        break;
    }
  }

  newProduct() {
    this.modalService.openModal<FormComponent, Product>(FormComponent);
  }

  editForm(data: Product) {
    this.modalService.openModal<FormComponent, Product>(FormComponent, data, true);
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
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
