import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentsService } from 'client/app/services/appointments.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-appointment-modal',
  templateUrl: './add-appointment-modal.component.html',
  styleUrls: ['./add-appointment-modal.component.scss']
})
export class AddAppointmentModalComponent {
  
  appointmentsForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private appointmentsService: AppointmentsService) {
    this.appointmentsForm = this.fb.group({
      motivo: ['', Validators.required],
      prioridad: ['', Validators.required],
      consultorio: ['', Validators.required],
      medico: ['', Validators.required],
      paciente: ['', Validators.required],
      
    })
  }

  guardar() {
    // Lógica para guardar el turno
    if (this.appointmentsForm.valid) {
      const turno = this.appointmentsForm.value;
      this.appointmentsService.createTurno(turno).subscribe((response: any) => {        
        if (response.ok) {
          // Cerrar el modal
          this.activeModal.close({ok: true, turno: response.turno});
        } else {
          // Mostrar mensaje de error
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo agregar el turno'
          });
        }
      });
    } else {
      // Mostrar mensaje de error
      for (const control in this.appointmentsForm.controls) {
        if (this.appointmentsForm.controls[control].invalid) {
          this.appointmentsForm.controls[control].markAsPending();
        }
      }

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor complete todos los campos obligatorios'
      });
    }
  }

}
