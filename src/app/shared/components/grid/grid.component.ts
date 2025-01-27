import {Component, inject, input, OnInit, output, viewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {Action} from "@shared/models/grid";
import {GridService} from "@shared/services/grid.service";

@Component({
  selector: 'app-grid',
  standalone: true,
    imports: [
        MatPaginatorModule,
        MatSortModule,
        MatTableModule
    ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent<T> implements OnInit {
  displayedColumns = input.required<string[]>();
  headers = input.required<string[]>();
  data = input.required<T[]>();
  sortableColumns = input<string[]>([]);

  refreshGrid = false;
  gridAction = output<Action>();

  dataSource = new MatTableDataSource<T>();
  private readonly _sort = viewChild.required<MatSort>(MatSort);
  private readonly _paginator = viewChild.required<MatPaginator>(MatPaginator);
  private gridService = inject(GridService);

  constructor() {
    this.gridService.refresh$.subscribe((data: boolean) => {
      setTimeout(() => {
        this.refreshGrid = data ? data : false;
      });
    });
  }

  ngOnInit() {
    this.dataSource.data = this.data();
    this.dataSource.sort = this._sort();
    this.dataSource.paginator = this._paginator();

    this.gridService.refresh$.subscribe((refresh: boolean) => {
      if (refresh) {
        setTimeout(() => {
          this.dataSource.data = this.data();
          this.gridService.unRefreshGrid();
        }, 2000);
      }
    });
  }

  sendActionTable(obj: Action) {
    this.gridAction.emit(obj);
  }
}
