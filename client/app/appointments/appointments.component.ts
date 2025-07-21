import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddAppointmentModalComponent } from './components/add-appointment-modal/add-appointment-modal.component';
import { AppointmentsService } from '../services/appointments.service';
import { AlertsService } from '../services/alerts.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent {
  public appointments: any[] = [];
  constructor (private appointmentsService: AppointmentsService, private modal: NgbModal, private alertsService: AlertsService) {
    this.refreshList();
  }

  //Function that gets all the appointments
  refreshList() {
    this.appointmentsService.getAllActive().subscribe({
      next: (data:any) => {
        this.appointments =  data.filter((appointment:any) => appointment.status === 'Arrived' || appointment.status === 'Pending');
      },
      error: err => {
        this.alertsService.errorSwal();
      }
    });
  }

  //Function that opens add appointment modal
  add() {
    let modal = this.modal.open(AddAppointmentModalComponent, {
      size: 'xl'});

    modal.result.then((data) => {
      if (data.ok) {
        //If succesfully added, data is pushed
        this.appointments.push(data.appointment);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Appointment added succesfully!'
        });
      } else {
        this.alertsService.errorSwal();
      }
    
    });
  }

  //Function to cancel appointment, id required
  cancel(id:string) {
    Swal.fire({
      title: "Warning",
      text: "This change is irreversible, the appointment will no longer appear on the list. \nDo you wish to continue?",
      showDenyButton: true,
      icon:'question',
      confirmButtonText: "Continue",
      denyButtonText: `Go back`
    }).then((result) => {
      if (result.isConfirmed) {
        this.appointmentsService.deleteAppointment(id).subscribe({
        next: (data:any) => {
          //If succesfully updated, appointment is deleted from array
          this.appointments.splice(this.appointments.findIndex(turno => turno._id === id), 1);
          Swal.fire("Appointment canceled.", "", "success");
        },
        error: err => {
          console.error(err)
          this.alertsService.errorSwal();
        }
      })
    }
  });
  }

  //Function to update appointment's status, id required
  async update(id:string) {

    const { value: status } = await Swal.fire({
    title: "Change status",
    input: "select",
    inputOptions: {
      Pending: "Pending",
      Arrived: "Arrived",
      Completed: "Completed",
    },
    inputPlaceholder: "Select a status",
    showCancelButton: true,
    inputValidator: (value) => {
      return new Promise((resolve) => {
        if (!value) {
          resolve("Status is required!");
        } else {
          resolve()
        }
      });
    }
    });

    if (status) {
      this.appointmentsService.updateAppointment(id, status).subscribe({
        next:() => {
          //If status is updated, the list is refreshed
          Swal.fire({title:'Status updated', text:'Status has been updated succesfully.', icon:'success'});
          this.refreshList();
        },
        error:err => {
          console.error(err);
          this.alertsService.errorSwal();
        }
      })
    }
  }


}
