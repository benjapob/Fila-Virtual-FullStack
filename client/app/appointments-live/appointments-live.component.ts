import { Component, ViewEncapsulation } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { SocketService } from '../services/socket.service';
import { AppointmentsService } from '../services/appointments.service';

@Component({
  selector: 'app-appointments-live',
  templateUrl: './appointments-live.component.html',
  styleUrls: ['./appointments-live.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }), // Empieza fuera de la pantalla
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })) // Entra suavemente
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 })) // Sale suavemente
      ])
    ]),
  ]
})
export class AppointmentsLiveComponent {
  // Public properties to hold the appointments data
  public pendingAppointments:any [] = [];
  public arrivedAppointments:any [] = [];
  constructor(private webSocket: SocketService, private appointmentService: AppointmentsService) {
    this.loadAppointments();
    // Subscribe to the WebSocket events to receive real-time updates
    this.webSocket
      .get("newAppointment")
      .subscribe((appointment: any) => {
        this.pendingAppointments.push(appointment);
        console.log('Nuevo pendiente recibido:', appointment);
      });
    this.webSocket
      .get("updatedAppointment")
      .subscribe((appointment:any) => {
          this.removeAppointment(appointment);
        // Update the appointment in the pending or arrived list
        if (appointment.status === 'Pending') {
          const index = this.pendingAppointments.findIndex((a: any) => a._id === appointment._id);
          if (index === -1) {
            this.pendingAppointments.push(appointment);
          }
        } else if (appointment.status === 'Arrived') {
          const index = this.arrivedAppointments.findIndex((a: any) => a._id === appointment._id);
          if (index === -1) {
            this.arrivedAppointments.push(appointment);
          }
        }
      });
  }

  //Function to remove an appointment from both lists
  removeAppointment(appointment: any) {
    this.pendingAppointments = this.pendingAppointments.filter((a: any) => a._id !== appointment._id);
    this.arrivedAppointments = this.arrivedAppointments.filter((a: any) => a._id !== appointment._id);
    console.log('Cita eliminada:', appointment);
  }

  //Function to load the appointments
  loadAppointments() {
    this.appointmentService.getAll().subscribe((data:any) => {
      // Filter appointments by status
      this.pendingAppointments = data.filter((appointment: any) => appointment.status === 'Pending')
        .sort((a: { createdAt: Date; }, b: { createdAt: Date; }) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      
      this.arrivedAppointments = data.filter((appointment: any) => appointment.status === 'Arrived')
        .sort((a: { updatedAt: Date; }, b: { updatedAt: Date; }) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
    });
  }

  //Function to track items by their id
  trackById(index: number, item: any): any {
    return item.id;
  }

}
