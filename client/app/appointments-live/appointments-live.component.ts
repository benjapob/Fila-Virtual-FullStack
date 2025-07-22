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
    trigger('listAnimation2', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }), // Empieza fuera de la pantalla
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })) // Entra suavemente
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 })) // Sale suavemente
      ])
    ])
  ]
})
export class AppointmentsLiveComponent {
  // Public properties to hold the appointments data
  public pendingAppointments:any [] = [];
  public arrivedAppointments:any [] = [];
  constructor(private webSocket: SocketService, private appointmentService: AppointmentsService) {
    this.loadAppointments();
    // Incializa la conexión al socket
    this.webSocket
      .recibir("actualizacionFila")
      .subscribe((socket: any) => {
        if ("pendingAppointments" in socket) {
          const nuevosDatos = socket.pendingAppointments
            .sort((a: { fecha_update: string | number | Date; }, b: { fecha_update: string | number | Date; }) => new Date(a.fecha_update).getTime() - new Date(b.fecha_update).getTime());
            this.pendingAppointments = nuevosDatos;
        }
        if ("arrivedAppointments" in socket) {
          const nuevosDatos = socket.arrivedAppointments
            .sort((a: { updatedAt: string | number | Date; }, b: { updatedAt: string | number | Date; }) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());

            this.arrivedAppointments = nuevosDatos;
        }
        // console.log(this.entregadoSala);
        // console.log(this.pickingProceso);
      });    
  }

  //Function to load the appointments
  loadAppointments() {
    this.appointmentService.getAll().subscribe((data:any) => {
      // Filter appointments by status
      this.pendingAppointments = data.filter((appointment: any) => appointment.status === 'Pending')
        .sort((a: { createdAt: string | number | Date; }, b: { createdAt: string | number | Date; }) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      
      this.arrivedAppointments = data.filter((appointment: any) => appointment.status === 'Arrived')
        .sort((a: { updatedAt: string | number | Date; }, b: { updatedAt: string | number | Date; }) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
    });
  }

  //Function to track items by their id
  trackById(index: number, item: any): any {
    return item.id;
  }

}
