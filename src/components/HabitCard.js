import React from 'react';

import { Card, CardActionArea, CardContent, CardHeader, IconButton, makeStyles } from '@material-ui/core';
import { CloseRounded } from '@material-ui/icons';

import { getDateString, getUpperbound } from '../utils/functions';

const HabitCard = ({ name, timeframe, lastClicked, currentTime, handleDelete, handleUpdate }) => {
  const getCardColor = () => {
    let ellapsedMilliseconds = currentTime - lastClicked;
    ellapsedMilliseconds = (ellapsedMilliseconds < 0) ? 0 : ellapsedMilliseconds;
    let percentage = 0;
    const upperbound = getUpperbound(timeframe);
    console.log('upperbound',upperbound);
    percentage = ellapsedMilliseconds / upperbound;
    
    percentage = (percentage > 1) ? 1 : percentage;
    console.log(percentage);
    const hue = 150 * (1 - percentage);
    return `hsl(${hue}, 50%, 50%)`;
  }

  const useStyles = makeStyles({
    card: {
      color: 'white',
      minWidth: 275,
      margin: '1rem',
      backgroundColor: getCardColor()
    },
    cardContent: {
      padding: '20px'
    }
  });

  const classes = useStyles();

  return (
    <Card className={classes.card} >
      <CardHeader
        title={name}
        action={
          <IconButton onClick={handleDelete.bind(this, name)} aria-label='settings'>
            <CloseRounded />
          </IconButton>
        } />
      <CardActionArea onClick={handleUpdate.bind(this, name)}>
        <CardContent className={classes.cardContent}>
          <h3>Last update on {getDateString(lastClicked)}</h3>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default HabitCard;