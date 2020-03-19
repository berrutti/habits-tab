import React from 'react';

import Card from "@material-ui/core/Card";
import { CardActionArea, CardContent, CardHeader, IconButton, makeStyles } from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

import { UPPERBOUNDS } from '../utils/constants';

const HabitCard = ({ name, timeframe, lastClicked, currentTime, handleDelete, handleUpdate }) => {
  const getBackgroundColor = () => {
    let ellapsedMilliseconds = currentTime - lastClicked;
    ellapsedMilliseconds = (ellapsedMilliseconds < 0) ? 0 : ellapsedMilliseconds;
    let percentage = 0;
    let upperbound = UPPERBOUNDS[timeframe];

    percentage = ellapsedMilliseconds / upperbound;
    percentage = (percentage > 1) ? 1 : percentage;
    const hue = 150 * (1 - percentage);
    return `hsl(${hue}, 50%, 50%)`;
  }

  const useStyles = makeStyles({
    card: {
      minWidth: 275,
      margin: '1rem',
      backgroundColor: getBackgroundColor()
    }
  });

  const classes = useStyles();

  return (
    <Card className={classes.card} >
      <CardHeader
        title={name}
        action={
          <IconButton onClick={handleDelete.bind(this, name)} aria-label="settings">
            <CloseRoundedIcon />
          </IconButton>
        } />
      <CardActionArea onClick={handleUpdate.bind(this, name)}>
        <CardContent>
          Updated on {new Date(lastClicked).toLocaleDateString()}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default HabitCard;