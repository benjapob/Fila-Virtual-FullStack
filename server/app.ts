import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { join as pathJoin } from 'path';

import { connectToDB } from './mongo';
import { setupSocket } from './socket';
import setRoutes from './routes';

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:4200', // Angular client origin URL
    methods: ['GET', 'POST'],
  }
});

app.set('port', (process.env['PORT'] || 3000));
app.use('/', express.static(pathJoin(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if (process.env['NODE_ENV'] === 'test') {
  app.use(morgan('dev'));
}

setRoutes(app);
setupSocket(io);

const main = async (): Promise<void> => {
  
  try {
    await connectToDB();
    server.listen(app.get('port'), () => console.log(`Angular Full Stack listening on port ${app.get('port')}`));
  } catch (err) {
    console.error(err);
  }
};

main();

export { app, io };
