import React from 'react';

import Card from "@material-ui/core/Card";
import { CardActionArea, CardContent, CardHeader, IconButton, makeStyles } from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

const HabitCard = props => {
  const useStyles = makeStyles({
    card: {
      minWidth: 275,
      margin: '1rem'
    }
  });

  const classes = useStyles();

  const handleCardClick = () => {
    console.log('Card click!', props.name)
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        title={props.name}
        action={
          <IconButton onClick={props.handleDelete.bind(this, props.name)} aria-label="settings">
            <CloseRoundedIcon />
          </IconButton>
        } />
      <CardActionArea onClick={handleCardClick}>
        <CardContent>
          Updated on {new Date(props.lastClicked).toLocaleDateString()}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default HabitCard;