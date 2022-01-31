import { useState, useEffect, useRef } from 'react';
import { Container, Paper } from '@mui/material';
import './App.css';
import ChatRoom from './components/Chatroom';
import { io } from 'socket.io-client';
import { Endpoint } from './config/index';

interface IUsername {
  id: string;
  username: string;
}
function App() {
  const [connectionUsers, setConnectionUsers] = useState<IUsername[]>([]);
  const socketRef: any = useRef(null);

  useEffect(() => {
    console.log('socketRef', socketRef);
    if (socketRef.current == null) {
      socketRef.current = io('http://localhost:3005');
    }
    console.log('socketRef2', socketRef);

    const { current: socket } = socketRef;

    try {
      socket.open();
      socket.emit('connection');

      socket.on('sendMsg', (data: any) => {
        console.log('data');
        // we get settings data and can do something with it
      });
      socket.on('getMsg', (data: any) => {
        console.log('data');
        // we get settings data and can do something with it
      });
    } catch (error) {
      console.log(error);
    }
    // Return a callback to be run before unmount-ing.
    return () => {
      socket.close();
    };
  }, []); // Pass in an empty array to only run on mount.

  return (
    <Container>
      <h1>Chat</h1>
      <ChatRoom socketRef={socketRef} />
    </Container>
  );
}

export default App;
