import React, { FunctionComponent } from 'react';

import {
  Checkbox,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
} from '@material-ui/core';


type SettingsDialogProps = {
  open: boolean;
  trackWeight: boolean;
  handleClose: () => void;
  handleValueChange: (event: any) => void;
}

const SettingsDialog: FunctionComponent<SettingsDialogProps> = ({ open, handleClose, trackWeight, handleValueChange }: SettingsDialogProps) => {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='settings-dialog-title'>
      <DialogTitle id='settings-dialog-title'>Settings</DialogTitle>
      <DialogContent>
        <h3>Application</h3>
        <FormControlLabel
          control={<Checkbox checked={trackWeight} onChange={handleValueChange} name="trackWeight" />}
          label="Track Weight"
        />
        <h3>Info</h3>
        <DialogContentText>Add the Habits you want to track. Every time you perform it, click its card to update it.
        If time passes without an update, the card color will start to decay from green to red, depending on the chosen timeframe.
        </DialogContentText>
        <h2>Good luck!</h2>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsDialog;