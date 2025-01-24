import {Component, EventEmitter, inject, Injectable, input, OnInit, output, viewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {FormsModule} from "@angular/forms";
import {Action} from "@shared/models/table";
import {TableService} from "@shared/services/table.service";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    FormsModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent<T> implements OnInit{
  displayedColumns = input.required<string[]>();
  headers = input.required<string[]>();
  data = input.required<T[]>();
  sortableColumns = input<string[]>([]);

  refreshTable = false;
  tableAction = output<Action>();

  dataSource = new MatTableDataSource<T>();
  private readonly _sort = viewChild.required<MatSort>(MatSort);
  private readonly _paginator = viewChild.required<MatPaginator>(MatPaginator);
  private tableService = inject(TableService);

  constructor() {
    this.tableService.refresh$.subscribe((data: boolean) => {
      setTimeout(() => {
        this.refreshTable = data ? data : false;
      });
    });
  }

  ngOnInit() {
    this.dataSource.data = this.data();
    this.dataSource.sort = this._sort();
    this.dataSource.paginator = this._paginator();

    this.tableService.refresh$.subscribe((refresh: boolean) => {
      if (refresh) {
        setTimeout(() => {
          this.dataSource.data = this.data();
          this.tableService.unRefreshTable();
        }, 2000);
      }
    });
  }

  sendActionTable(obj: Action) {
    this.tableAction.emit(obj);
  }
}
