import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }

  errorSwal() {
    return Swal.fire({
      title: 'Error',
      text: 'There was a server error. Please try again in a few minutes.',
      icon: 'error'
    });
  }
}
