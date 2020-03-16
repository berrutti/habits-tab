import React from 'react';

import Card from "@material-ui/core/Card";
import { CardActionArea, CardContent, CardHeader, IconButton, makeStyles } from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

const HabitCard = props => {
  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

  const classes = useStyles();

  const handleCardClick = () => {
    console.log('Card click!', props.name)
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton onClick={props.handleDelete.bind(this, props.name)} aria-label="settings">
            <CloseRoundedIcon />
          </IconButton>
        } />
      <CardActionArea onClick={handleCardClick}>
        <CardContent>
          {props.name} <br />
            Last update: {new Date(props.lastClicked).toString()}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default HabitCard;