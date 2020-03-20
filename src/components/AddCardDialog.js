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

import { getCurrentMiliseconds } from '../utils/functions';
import { TIMEFRAMES } from '../utils/constants';

const AddCardDialog = ({ open, handleClose, handleAddCard }) => {
  const [name, setName] = useState('');
  const [timeframe, setTimeframe] = useState(TIMEFRAMES.Daily);

  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
  }

  const handleNameChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  }

  const handleSubmit = event => {
    event.preventDefault();
    handleAddCard({ name, timeframe, lastClicked: getCurrentMiliseconds() });
    setName('');
    setTimeframe(TIMEFRAMES.Daily);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <form onSubmit={handleSubmit}>
          <DialogTitle id='form-dialog-title'>Add a New Habit</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a new Habit, please add a Name and select a Timeframe.
            </DialogContentText>
            <TextField
              autoFocus
              autoComplete='off'
              margin='dense'
              id='name'
              label='Name'
              type='text'
              fullWidth
              value={name}
              onChange={handleNameChange}
            />
            <FormControl fullWidth>
              <InputLabel id='timeframe-label'>Timeframe</InputLabel>
              <Select
                labelId='timeframe-label'
                id='timeframe'
                value={timeframe}
                onChange={handleTimeframeChange}>
                <MenuItem value={TIMEFRAMES.Daily}>Daily</MenuItem>
                <MenuItem value={TIMEFRAMES.Weekly}>Weekly</MenuItem>
                <MenuItem value={TIMEFRAMES.Monthly}>Monthly</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
          </Button>
            <Button onClick={handleClose} type='submit' color='primary'>
              Add
          </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default AddCardDialog;