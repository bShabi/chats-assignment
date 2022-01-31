import React from 'react';
import './App.css';
import socket from '../src/components/Services/Socket';

function App() {
  React.useEffect(() => {
    socket.emit('join', (data: any) => {
      console.log('jointed');
    });
  }, []);

  return <div>Heloo wolrd</div>;
}

export default App;
