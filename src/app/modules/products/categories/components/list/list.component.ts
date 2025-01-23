import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {ProductService} from "@services/product.service";
import {AlertService} from "@services/alert.service";
import {SpinnerService} from "@services/spinner.service";
import {Category} from "@models/product";
import {EditComponent} from "@modules/products/categories/components/edit/edit.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    EditComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit{
  private productService = inject(ProductService);
  private alertService = inject(AlertService);
  private spinnerService = inject(SpinnerService);

  categories: Category[] = [];

  displayedColumns: string[] = ['id', 'name', 'total_products', 'status', 'actions'];
  dataSource = new MatTableDataSource<Category>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  readonly dialog = inject(MatDialog);

  // Default filter criteria for each field
  categoryFilter: string = '';

  ngOnInit() {
    this.spinnerService.showSpinner();

    this.productService.getCategories().subscribe(
      (data: Category[]) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = this.createFilterCategories();

        this.spinnerService.hideSpinner();
      },
      (error) => {
        this.spinnerService.hideSpinner();
      }
    );
  }

  abrirDialogo() {
    const dialogRef = this.dialog.open(EditComponent, {
      panelClass: 'modal-app'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  createFilterCategories(): (data: any, filter: string) => boolean {
    const filterFunction = (data: any, filter: string) => {
      const filterArray = filter.split('|');
      const categoryFilter = filterArray[0].toLowerCase();

      // Apply individual field filters
      const matchesCategory = data.name.toLowerCase().includes(categoryFilter);

      // Return true if all conditions match
      return matchesCategory;
    };

    return filterFunction;
  }

  applyFilterCategories(): void {
    const filterValue = `${this.categoryFilter}`;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
