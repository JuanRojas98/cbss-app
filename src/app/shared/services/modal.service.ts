import {inject, Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ComponentType} from "@angular/cdk/portal";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private readonly _modal = inject(MatDialog);

  openModal<CT, T>(componentRef: ComponentType<CT>, data?: T, isEditing = false) {
    const config = {data, isEditing};
    this._modal.open(componentRef, {
      data: config,
      // width: '700px'
    });
  }

  closeModal() {
    this._modal.closeAll();
  }
}
