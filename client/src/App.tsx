import React from 'react';
import { Container, Paper } from '@mui/material';
import './App.css';
import socket from '../src/components/Services/Socket';
import ChatRoom from './components/Chatroom';

function App() {
  React.useEffect(() => {
    socket.emit('join', (data: any) => {
      console.log('jointed');
    });
  }, []);

  return (
    <Container>
      <h1>Chat</h1>
      <ChatRoom />
    </Container>
  );
}

export default App;
