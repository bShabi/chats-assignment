import { Theme } from '@mui/material';
import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
interface Props {
  message: string;
  // timestamp: string;
  // displayName?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    messageRow: {
      display: 'flex',
    },
    messageBlue: {
      position: 'relative',
      marginLeft: '20px',
      marginBottom: '10px',
      padding: '10px',
      backgroundColor: '#A8DDFD',
      width: '60%',
      textAlign: 'left',
      font: "400 .9em 'Open Sans', sans-serif",
      border: '1px solid #97C6E3',
      borderRadius: '10px',
      '&:after': {
        content: "''",
        position: 'absolute',
        width: '0',
        height: '0',
        borderTop: '15px solid #A8DDFD',
        borderLeft: '15px solid transparent',
        borderRight: '15px solid transparent',
        top: '0',
        left: '-15px',
      },
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '0',
        height: '0',
        borderTop: '17px solid #97C6E3',
        borderLeft: '16px solid transparent',
        borderRight: '16px solid transparent',
        top: '-1px',
        left: '-17px',
      },
    },

    messageContent: {
      padding: 0,
      margin: 0,
    },
    messageTimeStampRight: {
      position: 'absolute',
      fontSize: '.85em',
      fontWeight: '300',
      marginTop: '10px',
      bottom: '-3px',
      right: '5px',
    },

    orange: {
      width: 10,
      height: 20,
    },
    displayName: {
      marginLeft: '20px',
    },
  })
);

const MessageView: React.FC<Props> = (props) => {
  const message: string = props.message;
  const classes = useStyles();
  return (
    <>
      <div className={classes.messageRow}>
        <div>
          <div className={classes.messageBlue}>
            <div>
              <p className={classes.messageContent}>{message}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MessageView;
