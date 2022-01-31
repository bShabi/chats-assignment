import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { createStyles, makeStyles } from '@mui/styles';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { ILogMessage } from '.';

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
      //margin: theme.spacing(1),
    },
  })
);
interface Props {
  addMessage: (msg: string) => void;
}
export const EntryInput: React.FC<Props> = ({ addMessage }): JSX.Element => {
  const classes = useStyles();
  const [message, setMessage] = useState<string>();

  // const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const entry = e.currentTarget.value;
  //   console.log(entry);
  // };

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
          addMessage(target.message.value);
        }}>
        <TextField
          id='standard-text'
          label='Message'
          name='message'
          className={classes.wrapText}
          //margin="normal"
        />
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          type='submit'>
          <SendIcon />
        </Button>
      </form>
    </>
  );
};
