import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  
  constructor(private socket: Socket) {
  }
  emitir(evento: string, payload?: any, callback?: Function) {    
    this.socket.emit(evento, payload, callback);
  }

  escuchar(evento: string) {
    return this.socket.fromEvent(evento);
  }
}
