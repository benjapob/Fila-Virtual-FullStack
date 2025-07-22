const setupSocket = (io:any) => {
    io.on('connection', (socket: { id: any; on: (arg0: string, arg1: { (data: any): void; (): void; }) => void; }) => {
      console.log('User connected:', socket.id);
    
      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });
}

export { setupSocket };