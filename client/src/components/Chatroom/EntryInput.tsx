import React from 'react';
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
      //margin: theme.spacing(1),
    },
  })
);
export const EntryInput: React.FC = (): JSX.Element => {
  const classes = useStyles();
  return (
    <>
      <form className={classes.wrapForm} noValidate autoComplete='off'>
        <TextField
          id='standard-text'
          label='Message'
          className={classes.wrapText}
          //margin="normal"
        />
        <Button variant='contained' color='primary' className={classes.button}>
          <SendIcon />
        </Button>
      </form>
    </>
  );
};
