import { Paper } from '@mui/material';
import * as React from 'react';
import { EntryInput } from './EntryInput';
import { createStyles, makeStyles } from '@mui/styles';
import MessageView from './MessageView';
import { ServerToClientEvents, ClientToServerEvents } from '../../App';
import { io, Socket } from 'socket.io-client';

import { toast, ToastContainer } from 'react-toastify';

export interface IMessage {
  username: string;
  message: ILogMessage[];
}
export interface ILogMessage {
  message: string;
}
interface Props {
  socketRef: Socket<ServerToClientEvents, ClientToServerEvents>;
  // allMessages?: string[] | undefined;
}
const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      width: '80vw',
      height: '80vh',
      maxWidth: '500px',
      maxHeight: '700px',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'relative',
    },
    paper2: {
      width: '80vw',
      maxWidth: '500px',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'relative',
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    messagesBody: {
      width: 'calc( 100% - 20px )',
      margin: 10,
      overflowY: 'scroll',
      height: 'calc( 100% - 80px )',
    },
  })
);

const ChatRoom: React.FC<Props> = ({ socketRef }): JSX.Element => {
  const classes = useStyles();
  const [messages, setMessages] = React.useState<string[]>([]);

  const addMessage = (msg: string) => {
    socketRef.emit('addMessage', msg);
    if (!msg) return;
    setMessages((oldArray) => [...oldArray, msg]);
    toast.success('Send message');
  };
  React.useEffect(() => {
    socketRef.on('allMessages', (messages: string[]) => {
      console.log('all messages', messages);
      setMessages(messages);
      toast.info('New Message');
    });
  }, []);
  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Paper id='style-1' className={classes.messagesBody}>
          {messages.map((message: string, id: number) => {
            return <MessageView key={id} message={message} />;
            // return <MessageView key={id} message={message} />;
          })}
        </Paper>
        <EntryInput addMessage={addMessage} />
      </Paper>
      <ToastContainer position='bottom-right' />
    </div>
  );
};

export default ChatRoom;
