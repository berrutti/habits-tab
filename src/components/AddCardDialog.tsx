import React, { useState, FunctionComponent, ChangeEvent } from 'react';

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
import { Timeframe, Card } from '../utils/types';

type AddCardDialogProps = {
  open: boolean;
  handleClose: (() => void);
  handleAddCard: ((card: Card) => void);
}

const AddCardDialog: FunctionComponent<AddCardDialogProps> = ({ open, handleClose, handleAddCard }: AddCardDialogProps) => {
  const [name, setName] = useState('');
  const [isRegular, setIsRegular] = useState(true);
  const [timeframe, setTimeframe] = useState(Timeframe.Daily);

  const handleTimeframeChange = (event: ChangeEvent<{
    name?: string | undefined;
    value: unknown;
  }>): void => {
    setTimeframe(event.target.value as number);
    setIsRegular(true);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!event.target.errors) {
      handleClose();
      handleAddCard({ name, timeframe, lastClicked: getCurrentMiliseconds(), isRegular });
      setName('');
      setTimeframe(Timeframe.Daily);
    }

  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <form
          onSubmit={handleSubmit}>
          <DialogTitle id='form-dialog-title'>Add a New Habit</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a new Habit, please add a Name and select a Timeframe.
            </DialogContentText>
            <TextField
              autoFocus
              required
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
                <MenuItem value={Timeframe.Daily}>Daily</MenuItem>
                <MenuItem value={Timeframe.EveryTwo}>Every two days</MenuItem>
                <MenuItem value={Timeframe.EveryThree}>Every three days</MenuItem>
                <MenuItem value={Timeframe.EveryFour}>Every four days</MenuItem>
                <MenuItem value={Timeframe.EveryFive}>Every five days</MenuItem>
                <MenuItem value={Timeframe.EverySix}>Every six days</MenuItem>
                <MenuItem value={Timeframe.Weekly}>Weekly</MenuItem>
                <MenuItem value={Timeframe.Biweekly}>Bi-weekly</MenuItem>
                <MenuItem value={Timeframe.Threeweekly}>Three-weekly</MenuItem>
                <MenuItem value={Timeframe.Monthly}>Monthly</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
          </Button>
            <Button type='submit' color='primary'>
              Add
          </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default AddCardDialog;