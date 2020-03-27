import React, { FunctionComponent } from 'react';

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';


type HelpDialogProps = {
  open: boolean;
  handleClose: () => void;
}

const HelpDialog: FunctionComponent<HelpDialogProps> = ({ open, handleClose }: HelpDialogProps) => {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='help-dialog-title'>
      <DialogTitle id='help-dialog-title'>What is this all about?</DialogTitle>
      <DialogContent>
        <DialogContentText>Add the Habits you want to track. Every time you perform it, click on the card to update
          its status. If some times passes and you don&apos;t perform that habit, the card color will start to decay from
          green to red based on the timeframe you chose on creation.
        </DialogContentText>
        <DialogContentText>You can toggle the switch to reverse it. In this case, you click on card when you fail to perform
          your habit. So for instance, if one of my habits is &quot;Healthy eating&quot; and I binge the entire day,
          I can click on the card to make it red, and after a day or two of good eating, the card will turn green again.
        </DialogContentText>
        <h2>Good luck!</h2>
      </DialogContent>
    </Dialog>
  );
}

export default HelpDialog;