import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Shift} from "@models/shift";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  public started$: EventEmitter<boolean>;
  constructor(
    private http: HttpClient
  ) {
    this.started$ = new EventEmitter<boolean>(false);
  }

  getCurrentShift() {
    return localStorage.getItem('currentShift');
  }

  getShift(id: number) {
    return this.http.get<Shift>(`/shifts/${id}`);
  }

  startShift(body: Shift) {
    return this.http.post('/shifts', body);
  }

  endShift(id: number, body: Partial<Shift>) {
    return this.http.put(`/shifts/${id}`, body);
  }

  startedShift(shift: Shift) {
    localStorage.setItem('currentShift', JSON.stringify(shift));
    return this.started$.next(true);
  }

  endedShift() {
    localStorage.removeItem('currentShift');
    return this.started$.next(false);
  }
}
