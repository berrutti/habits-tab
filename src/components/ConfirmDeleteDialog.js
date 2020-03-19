import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';


ConfirmationDialogRaw = (props) => {
  const { onClose: handleClose, open  } = props;

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={open}
    >
      <DialogTitle id="confirmation-dialog-title">Are you sure you want to delete?</DialogTitle>
      <DialogContent dividers>
        This action is cannot be undone
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose(true)} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteDialog;


