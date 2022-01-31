import { Paper } from '@mui/material';
import * as React from 'react';
import { EntryInput } from './EntryInput';
import { createStyles, makeStyles } from '@mui/styles';
import { MessageLeft, MessageRight } from './MessageView';
export interface IMessage {
  name: string;
  message: string[];
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

const ChatRoom: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const [message, setMessage] = React.useState<IMessage[]>([]);

  React.useEffect(() => {
    if (message) {
      console.log(message);
    }
  }, [message]);

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Paper id='style-1' className={classes.messagesBody}>
          <MessageRight message='Test' timestamp='22/10' />
          <MessageLeft message='Test' timestamp='22/10' />
        </Paper>
        <EntryInput />
      </Paper>
    </div>
  );
};

export default ChatRoom;
