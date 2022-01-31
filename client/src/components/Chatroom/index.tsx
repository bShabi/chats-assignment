import { Paper } from '@mui/material';
import * as React from 'react';
import { EntryInput } from './EntryInput';
import { createStyles, makeStyles } from '@mui/styles';
import { MessageLeft, MessageRight } from './MessageView';
import { toast, ToastContainer } from 'react-toastify';

export interface IMessage {
  username: string;
  message: ILogMessage[];
}
export interface ILogMessage {
  text: string;
  date: string;
}
interface Props {
  socketRef: any;
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
  const [messages, setMessages] = React.useState<ILogMessage>();

  const addMessage = (msg: ILogMessage) => {
    setMessages(msg);
    console.log(msg);
    // console.log('socketRef3', socketRef);

    toast.success('Send message');
    socketRef.emit('sendMessage', (messages: ILogMessage) => {
      console.log(messages);
    });
  };

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Paper id='style-1' className={classes.messagesBody}>
          <MessageRight message='Test' timestamp='22/10' />
          <MessageLeft message='Test' timestamp='22/10' />
        </Paper>
        <EntryInput addMessage={addMessage} />
      </Paper>
      <ToastContainer position='bottom-right' />
    </div>
  );
};

export default ChatRoom;
