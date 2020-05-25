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
  hidden: boolean;
  handleClose: () => void;
  handleSetHidden: (event: any) => void;
}

const SettingsDialog: FunctionComponent<SettingsDialogProps> = ({ open, handleClose, hidden, handleSetHidden }: SettingsDialogProps) => {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='settings-dialog-title'>
      <DialogTitle id='settings-dialog-title'>Settings</DialogTitle>
      <DialogContent>
        <h3>Application</h3>
        <FormControlLabel
          control={<Checkbox checked={hidden} onChange={handleSetHidden} name="Hidden" />}
          label="Hide cards"
        />
        <h3>Info</h3>
        <DialogContentText>Add the Habits you want to track. Every time you perform it, click its card to update it.
        If time passes without an update, the card color will start to decay from green to red, depending on the chosen timeframe.
        </DialogContentText>
        <DialogContentText>If the card is set to "Reverse", you'll click the card when you fail to perform
        your habit. This is good for habits like &quot;Healthy eating&quot;. If you eat badly, you can click on the card to make it red,
        and after a day or two of good eating, the card will turn green again.
        </DialogContentText>
        <h2>Good luck!</h2>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsDialog;