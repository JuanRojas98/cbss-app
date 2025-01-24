import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  public refresh$: EventEmitter<boolean>;

  constructor() {
    this.refresh$ = new EventEmitter<boolean>();
  }

  refreshTable() {
    this.refresh$.next(true);
  }

  unRefreshTable() {
    this.refresh$.next(false);
  }
}
