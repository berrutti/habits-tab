import React, { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';

import getCurrentMiliseconds from '../utils/miliseconds';

const FormDialog = (props) => {
  const [name, setName] = useState('');
  const [timeframe, setTimeframe] = useState('daily');

  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
  }

  const handleNameChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  }

  const handleSubmit = event => {
    event.preventDefault();
    props.handleAddCard({ name: name, timeframe: timeframe, lastClicked: getCurrentMiliseconds() });
    setName('');
    setTimeframe('daily');
  }

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Add a New Habit</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a new Habit, please add a Name and select a Timeframe.
          </DialogContentText>
            <TextField
              autoFocus
              autoComplete="off"
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              value={name}
              onChange={handleNameChange}
            />
            <FormControl>
              <InputLabel id="timeframe-label">Timeframe</InputLabel>
              <Select
                labelId="timeframe-label"
                id="timeframe"
                value={timeframe}
                fullWidth
                onChange={handleTimeframeChange}
              >
                <MenuItem value='daily'>Daily</MenuItem>
                <MenuItem value='weekly'>Weekly</MenuItem>
                <MenuItem value='monthly'>Monthly</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              Cancel
          </Button>
            <Button onClick={props.handleClose} type="submit" color="primary">
              Add
          </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default FormDialog;