import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';


const ConfirmDeleteDialog = ({ open, handleClose, handleConfirm }) => {
  return (
    <Dialog
      onClose={handleClose}
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth='xs'
      aria-labelledby='confirmation-dialog-title'
      open={open}
    >
      <DialogTitle id='confirmation-dialog-title'>Are you sure you want to delete this Habit?</DialogTitle>
      <DialogContent dividers>
        This action is cannot be undone
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleConfirm} color='primary'>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteDialog;


