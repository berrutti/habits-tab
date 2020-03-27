import React, { FunctionComponent } from 'react';

import { Card, CardActionArea, CardContent, CardHeader, IconButton, makeStyles } from '@material-ui/core';
import { CloseRounded } from '@material-ui/icons';

import { getDateString, getUpperbound } from '../utils/functions';
import { Card as CardType } from '../utils/types';

type HabitCardProps = {
  card: CardType;
  currentTime: number;
  handleDelete: (name: string) => void;
  handleUpdate: (name: string) => void;
}

const HabitCard: FunctionComponent<HabitCardProps> = ({ card, currentTime, handleDelete, handleUpdate }: HabitCardProps) => {
  const getCardColor = (): string => {
    let ellapsedMilliseconds = currentTime - card.lastClicked;
    ellapsedMilliseconds = (ellapsedMilliseconds < 0) ? 0 : ellapsedMilliseconds;
    let percentage = 0;
    const upperbound = getUpperbound(card.timeframe);
    percentage = ellapsedMilliseconds / upperbound;

    percentage = (percentage > 1) ? 1 : percentage;
    const hue = card.isRegular ? 150 * (1 - percentage) : 150 * percentage;
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
        title={card.name}
        action={
          <IconButton onClick={() => handleDelete(card.name)} aria-label='settings'>
            <CloseRounded />
          </IconButton>
        } />
      <CardActionArea onClick={() => handleUpdate(card.name)}>
        <CardContent className={classes.cardContent}>
          <h3>Last update on {getDateString(card.lastClicked)}</h3>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default HabitCard;