import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Table} from "@models/table";

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(
    private http: HttpClient
  ) { }

  getTables() {
    return this.http.get<Table[]>('/tables');
  }
}
