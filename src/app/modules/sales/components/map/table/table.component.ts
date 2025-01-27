import {Component, inject, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent} from "@angular/material/dialog";
import {Table} from "@models/table";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogContent,
    ReactiveFormsModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit{
  private readonly _matDialog = inject(MAT_DIALOG_DATA);
  table: Table = this._matDialog.data;

  ngOnInit() {
    // this.table = this._matDialog.data;
  }
}
