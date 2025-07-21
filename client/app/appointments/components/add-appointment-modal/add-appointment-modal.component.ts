import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from 'client/app/services/alerts.service';
import { AppointmentsService } from 'client/app/services/appointments.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-appointment-modal',
  templateUrl: './add-appointment-modal.component.html',
  styleUrls: ['./add-appointment-modal.component.scss']
})
export class AddAppointmentModalComponent {
  
  appointmentsForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal, 
    private fb: FormBuilder, 
    private appointmentsService: AppointmentsService,
    private alertsService: AlertsService
  ) {
    //Form creation
    this.appointmentsForm = this.fb.group({
      reason: ['', Validators.required],
      priority: ['', Validators.required],
      medicalCenter: ['', Validators.required],
      doctor: ['', Validators.required],
      patient: ['', Validators.required],
    })
  }

  save() {
    //Save appointment
    if (this.appointmentsForm.valid) {
      const appointment = this.appointmentsForm.value;
      this.appointmentsService.addAppointment(appointment).subscribe({
      next: (data:any) => {
        //Close modal
        this.activeModal.close({ok: true, appointment: data});
      },
      error: err => {
        console.error(err)
        this.alertsService.errorSwal();
      }
    });
    } else {
      // Show validation's error
      for (const control in this.appointmentsForm.controls) {
        if (this.appointmentsForm.controls[control].invalid) {
          this.appointmentsForm.controls[control].markAsPending();
        }
      }

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill all the required * fields.'
      });
    }
  }

}
