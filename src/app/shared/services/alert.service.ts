import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  success(message: string) {
    Swal.fire({
      title: 'Listo!',
      html: message,
      icon: 'success',
      timer: 2000,
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false
    }).then();
  }

  warning(message: string) {
    Swal.fire({
      title: 'Atención!',
      html: message,
      icon: 'warning',
      denyButtonText: 'Cerrar',
      showCancelButton: false,
      showConfirmButton: false,
      showDenyButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false
    }).then();
  }

  error(message: string) {
    Swal.fire({
      title: 'Oops!',
      html: message,
      icon: 'error',
      cancelButtonText: 'Cerrar',
      showCancelButton: true,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false
    }).then();
  }

  waiting(message: string) {
    Swal.fire({
      title: 'Por favor espere.',
      html: message,
      loaderHtml: `<div class="spinner-border text-blue-dark" style="width: 3rem; height: 3rem; border: 0.4rem solid !important;
            border-right: 0.25em solid transparent !important;"><span class="sr-only">Cargando...</span></div>`,
      customClass: {
        loader: 'custom-loader'
      },
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      didOpen: () => {
        Swal.showLoading()
      }
    }).then();
  }
}
