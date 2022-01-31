import { useState, useEffect, useRef } from 'react';
import { Container, Paper } from '@mui/material';
import './App.css';
import ChatRoom from './components/Chatroom';
import { io, Socket } from 'socket.io-client';
import { Endpoint } from './config/index';

interface IUsername {
  id: string;
  username: string;
}
export interface ServerToClientEvents {
  noArg: () => void;
  allMessages: (messages: string[]) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
  addMessage: (message: string) => void;
}
function App() {
  const [connectionUsers, setConnectionUsers] = useState<IUsername[]>([]);
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    'http://localhost:3005'
  );

  useEffect(() => {
    socket.on('connect', () => {
      console.log('first');
      // ...
    });
    socket.on('allMessages', (messages: string[]) => {
      console.log('all messages', messages);
    });
  });

  // useEffect(() => {
  //   console.log('socketRef', socket);
  //   if (socket == null) {
  //     socketRef = io('http://localhost:3005');
  //   }
  //   console.log('socketRef2', socketRef);

  //   const { current: socket } = socketRef;

  //   try {
  //     socket.open();
  //     socket.emit('connection');

  //     socket.on('sendMsg', (data: any) => {
  //       console.log('data');
  //       // we get settings data and can do something with it
  //     });
  //     socket.on('getMsg', (data: any) => {
  //       console.log('data');
  //       // we get settings data and can do something with it
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   // Return a callback to be run before unmount-ing.
  //   return () => {
  //     socket.close();
  //   };
  // }, []); // Pass in an empty array to only run on mount.

  return (
    <Container>
      <h1>Chat</h1>
      <ChatRoom socketRef={socket} />
    </Container>
  );
}

export default App;
