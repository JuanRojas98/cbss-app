import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  public refresh$: EventEmitter<boolean>;

  constructor() {
    this.refresh$ = new EventEmitter<boolean>();
  }

  refreshGrid() {
    this.refresh$.next(true);
  }

  unRefreshGrid() {
    this.refresh$.next(false);
  }
}
