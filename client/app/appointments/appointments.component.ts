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
    this.appointmentsService.getTurnos().subscribe((data:any) => {
      if (data.ok) {
        this.appointments = data.appointments;
      } else {
        this.alertsService.errorSwal();
      }
    });
  }

  openModal() {
    let modal = this.modal.open(AddAppointmentModalComponent, {
      size: 'xl'});

    modal.result.then((data) => {
      if (data.ok) {
        this.appointments.push(data.turno);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Turno agregado correctamente'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo agregar el turno'
        });
      }
    
    },
    (error) => {
    });
  }

  cancelAppointment(id:string) {
    Swal.fire({
      title: "Aviso",
      text: "Este cambio es irreversible, el turno se eliminará de la lista. ¿Deseas continuar?",
      showDenyButton: true,
      icon:'question',
      confirmButtonText: "Continuar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.appointmentsService.deleteTurno(id).subscribe((response: any) => {
          if (response.ok) {
            //Elimino el elemento del array
            this.appointments.splice(this.appointments.findIndex(turno => turno._id === id), 1);
            Swal.fire("Turno eliminado!", "", "success");
          }
        });
      }
    });
  }

  async updateAppointment(id:string) {

    const { value: estado } = await Swal.fire({
    title: "Cambiar estado",
    input: "select",
    inputOptions: {
      espera: "En espera",
      atencion: "En atención",
      finalizado: "Finalizado",
    },
    inputPlaceholder: "Selecciona un estado",
    showCancelButton: true,
    inputValidator: (value) => {
      return new Promise((resolve) => {
        if (!value) {
          resolve("El estado es obligatorio!");
        } else {
          resolve()
        }
      });
    }
    });

    if (estado) {
      this.appointmentsService.updateTurno(id, estado).subscribe((respuesta:any) => {
        if (respuesta.ok) {
          Swal.fire({title:'Estado actualizado', text:'El estado ha sido actualizado correctamente', icon:'success'});
          this.appointmentsService.getTurnos().subscribe((data:any) => {
          if (data.ok) {
            this.appointments = data.appointments;
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudieron cargar los appointments'
            });
          }
        });
        }
      })
    }
  }


}
