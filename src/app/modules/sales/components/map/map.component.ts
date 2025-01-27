import {Component, inject, OnInit} from '@angular/core';
import {SpinnerService} from "@shared/services/spinner.service";
import {ModalService} from "@shared/services/modal.service";
import {ShiftService} from "@services/shift.service";
import {AlertService} from "@shared/services/alert.service";
import {Table} from "@models/table";
import {SaleService} from "@services/sale.service";
import {TableComponent} from "@modules/sales/components/map/table/table.component";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit{
  private alertService = inject(AlertService);
  private modalService = inject(ModalService);
  private saleService = inject(SaleService);
  private shiftService = inject(ShiftService);
  private spinnerService = inject(SpinnerService);

  enableMap = false;
  tables: Table[] = [];

  ngOnInit() {
    this.spinnerService.showSpinner();
    const currentShift = JSON.parse(<string> this.shiftService.getCurrentShift());

    this.saleService.getTables().subscribe(
      (data: Table[]) => {
        this.tables = data;
        console.log(this.tables);

        if (currentShift) {
          this.enableMap = true;
          this.spinnerService.hideSpinner();
        }
        else {
          this.alertService.warning('Recuerde que debe iniciar el turno para poder acceder al mapa.');
          this.spinnerService.hideSpinner();
        }

        this.shiftService.started$.subscribe((started: boolean) => {
          if (started) {
            this.enableMap = true;
          }
          else {
            this.enableMap = false;
            this.alertService.warning('Recuerde que debe iniciar el turno para poder acceder al mapa.');
          }
        })
      }
    )
  }

  openSalesTable(table: Table) {
    this.modalService.openModal<TableComponent, Table>(TableComponent, table);
    // this.tables.filter((table) => {
    //   if (table.id == id) {
    //     table.available = 0;
    //   }
    // });
    // console.log(id);
  }
}
