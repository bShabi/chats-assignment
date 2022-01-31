import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { userJoin, userLeft, getUsers } from './util/users';
import { addMessage, getAllMessages } from './util/messages';

interface ServerToClientEvents {
  allMessages: (messages: string[]) => void;
}

interface ClientToServerEvents {
  addMessage: (message: string) => void;
}

const app = express();

const server = createServer(app);
const socket = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: { origin: '*' },
});

socket.on('connection', (socket) => {
  socket.emit('allMessages', getAllMessages());
  socket.on('addMessage', (message) => {
    addMessage(message);
    socket.emit('allMessages', getAllMessages());
  });
});

// socket.on('disconnect', () => {
//   userLeft(socket.id);
// });
// });

server.listen(3005, () => console.log('Server started on port 3005...'));
