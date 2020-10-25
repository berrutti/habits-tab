import React, { FunctionComponent } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  cancelText?: string;
  okText?: string;
  handleClose: (() => void);
  handleConfirm: (() => void);
}

const ConfirmDialog: FunctionComponent<ConfirmDialogProps> = ({ open, title, message, cancelText = 'Cancel', okText = 'Ok', handleClose, handleConfirm }: ConfirmDialogProps) => {
  return (
    <Dialog
      onClose={handleClose}
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth='xs'
      aria-labelledby='confirmation-dialog-title'
      open={open}
    >
      <DialogTitle id='confirmation-dialog-title'>{title}</DialogTitle>
      <DialogContent dividers>
        {message}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color='primary'>
          {cancelText}
        </Button>
        <Button onClick={handleConfirm} color='primary'>
          {okText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;


