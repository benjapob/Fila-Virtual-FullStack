import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http: HttpClient) { }

  getTurnos() {
    return this.http.get('/api/appointments');
  }

  createTurno(turno: any) {
    return this.http.post('http://localhost:3003/createTurno', turno);
  }

  deleteTurno(id: any) {
    return this.http.post('http://localhost:3003/deleteTurno', {id});
  }

  updateTurno(id: any, estado: string) {
    return this.http.post('http://localhost:3003/updateTurno', {id, estado});
  }
}
