import React, { FunctionComponent } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

type ConfirmDeleteDialogProps = {
  open: boolean;
  handleClose: (() => void);
  handleConfirm: (() => void);
}

const ConfirmDeleteDialog: FunctionComponent<ConfirmDeleteDialogProps> = ({ open, handleClose, handleConfirm }: ConfirmDeleteDialogProps) => {
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


