import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  constructor() {
    this.socket = io('http://localhost:3000');
  }
  
  emitir(evento:string, msg?: any): void {    
    this.socket.emit(evento, msg);
  }

  recibir(evento:string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(evento, (data: any) => {
        observer.next(data);
      });
    });
  }
}
