import { useState, useEffect, useRef } from 'react';
import { Container, Paper } from '@mui/material';
import './App.css';
import socket from '../src/components/Services/Socket';
import ChatRoom from './components/Chatroom';
import { Socket } from 'socket.io-client';

function App() {
  useEffect(() => {
    socket.emit('connection', (data: any) => {
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
