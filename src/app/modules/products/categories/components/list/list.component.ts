import {Component, inject, OnChanges, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ProductService} from "@services/product.service";
import {SpinnerService} from "@shared/services/spinner.service";
import {Category} from "@models/product";
import {ModalService} from "@shared/services/modal.service";
import {GridComponent} from "@shared/components/grid/grid.component";
import {Action} from "@shared/models/grid";
import {GridService} from "@shared/services/grid.service";
import {FormComponent} from "@modules/products/categories/components/form/form.component";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    FormsModule,
    GridComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  private productService = inject(ProductService);
  private spinnerService = inject(SpinnerService);
  private modalService = inject(ModalService);
  private gridService = inject(GridService);

  refreshData = false;

  constructor() {
    this.gridService.refresh$.subscribe((data: boolean) => {
      setTimeout(() => {
        this.refreshData = data ? data : false;
      });
    });
  }

  categories: Category[] = [];

  // displayedColumns: string[] = ['id', 'name', 'total_products', 'status', 'actions'];
  displayedColumns = ['id', 'name', 'total_products', 'status', 'actions'];
  headers = ['ID', 'Categoría', 'Total productos', 'Estado', ''];
  sortables = ['id'];

  // Default filter criteria for each field
  categoryFilter: string = '';

  ngOnInit() {
    this.spinnerService.showSpinner();
    this.getCategories();

    this.gridService.refresh$.subscribe((refresh: boolean) => {
      if (refresh) {
        this.getCategories();
      }
    });
  }

  getCategories() {
    this.productService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
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
        const category: Category[] = this.categories.filter((cat) => cat.id == actionTable.id);
        this.editForm(category[0]);
        break;
      case 'view':
        break;
      default:
        break;
    }
  }

  newCategory() {
    this.modalService.openModal<FormComponent, Category>(FormComponent);
  }

  editForm(data: Category) {
    this.modalService.openModal<FormComponent, Category>(FormComponent, data, true);
  }

  // createFilterCategories(): (data: any, filter: string) => boolean {
  //   const filterFunction = (data: any, filter: string) => {
  //     const filterArray = filter.split('|');
  //     const categoryFilter = filterArray[0].toLowerCase();
  //
  //     // Apply individual field filters
  //     const matchesCategory = data.name.toLowerCase().includes(categoryFilter);
  //
  //     // Return true if all conditions match
  //     return matchesCategory;
  //   };
  //
  //   return filterFunction;
  // }
  //
  // applyFilterCategories(): void {
  //   const filterValue = `${this.categoryFilter}`;
  //   console.log(filterValue);
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
}
