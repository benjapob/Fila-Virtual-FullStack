const setupSocket = (io:any) => {
    io.on('connection', (socket: { id: any; on: (arg0: string, arg1: { (data: any): void; (): void; }) => void; }) => {
      console.log('User connected:', socket.id);

      socket.on('loadAppointments', () => {
        console.log('Loading appointments...');
        // Emit the message to all connected clients
        io.emit('appointments', []);
      });
    
      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });
}

export { setupSocket };