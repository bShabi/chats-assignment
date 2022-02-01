import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { createStyles, makeStyles } from '@mui/styles';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

const useStyles = makeStyles(() =>
  createStyles({
    wrapForm: {
      display: 'flex',
      justifyContent: 'center',
      width: '95%',
    },
    wrapText: {
      width: '100%',
    },
    button: {
      margin: 5,
    },
  })
);
interface Props {
  addMessage: (msg: string) => void;
}
export const EntryInput: React.FC<Props> = ({ addMessage }): JSX.Element => {
  const classes = useStyles();
  const [message, setMessage] = useState<string>('');

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };
  return (
    <>
      <form
        className={classes.wrapForm}
        autoComplete='off'
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
            message: { value: string };
          };
          if (!target.message.value) {
            return;
          }
          addMessage(target.message.value);
          setMessage('');
        }}>
        <TextField
          className={classes.wrapText}
          id='standard-text'
          label='Message'
          name='message'
          value={message}
          onChange={changeHandler}
        />
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          type='submit'>
          <SendIcon />
        </Button>
      </form>
    </>
  );
};
