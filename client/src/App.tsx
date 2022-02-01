import { useEffect } from 'react';
import { Container } from '@mui/material';
import './App.css';
import ChatRoom from './components/Chatroom';
import { io, Socket } from 'socket.io-client';
import { Endpoint } from './config';

export interface ServerToClientEvents {
  noArg: () => void;
  allMessages: (messages: string[]) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
  addMessage: (message: string) => void;
}
function App() {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
    io(Endpoint);

  useEffect(() => {
    try {
      socket.on('connect', () => {});
    } catch (error) {
      console.log(error);
    }
    // Return a callback to be run before unmount-ing.
    return () => {
      socket.close();
    };
  });

  return (
    <Container>
      <h1>Chat</h1>
      <ChatRoom socketRef={socket} />
    </Container>
  );
}

export default App;
