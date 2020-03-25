import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

const HelpDialog = ({ open, handleClose }) => {
  console.log('Is open',open);
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='help-dialog-title'>
      <DialogTitle id='help-dialog-title'>F.A.Q.</DialogTitle>
      <DialogContent>
        <DialogContentText>Bla bla bla</DialogContentText>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button type='submit' color='primary'>
            Add
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default HelpDialog;