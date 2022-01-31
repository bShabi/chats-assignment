import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { userJoin, userLeft, getUsers } from './util/users';

const app = express();

const server = http.createServer(app);
const socket = new Server(server, { cors: { origin: '*' } });

socket.on('connection', (socket) => {
  console.log('socket', socket.id);
  console.log('All users', getUsers());
  socket.join('myChat');
  // socket.on('sendMessage', (username: string) => {
  //   console.log('username', username);
  // });

  socket.on('handle-connection', (username: string) => {
    if (!userJoin(socket.id, username)) {
      socket.emit('username-taken');
    } else {
      socket.emit('username-submitted-successfully');
      socket.to('myChat').emit('get-connected-users', getUsers());
    }
  });

  socket.on('message', (message: { message: string; username: string }) => {
    socket.broadcast.to('myChat').emit('receive-message', message);
  });

  socket.on('disconnect', () => {
    userLeft(socket.id);
  });
});

server.listen(3005, () => console.log('Server started on port 3005...'));
