import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get('/api/appointments');
  }

  getAllActive() {
    return this.http.get('/api/appointments/status/active');
  }

  addAppointment(appointment: any) {
    return this.http.post('/api/appointment', appointment);
  }

  deleteAppointment(id:string) {
    return this.http.put(`/api/appointment/${id}`, {status:'Canceled'});
  }

  updateAppointment(id: any, status: string) {
    return this.http.put(`/api/appointment/${id}`, {status});
  }
}
