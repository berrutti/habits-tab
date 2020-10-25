import React, { FunctionComponent } from 'react';

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';


type SettingsDialogProps = {
  open: boolean;
  handleClose: () => void;
  handleValueChange: (event: any) => void;
}

const SettingsDialog: FunctionComponent<SettingsDialogProps> = ({ open, handleClose, handleValueChange }: SettingsDialogProps) => {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='settings-dialog-title'>
      <DialogTitle id='settings-dialog-title'>Habits Tab</DialogTitle>
      <DialogContent>
        <DialogContentText>Add the Habits you want to track. Every time you perform it, click its card to update it.
        If time passes without an update, the card color will start to decay from green to red, depending on the chosen timeframe.
        </DialogContentText>
        <h2>Good luck!</h2>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsDialog;