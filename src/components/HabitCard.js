import React from 'react';

import Card from "@material-ui/core/Card";
import { CardActionArea, CardContent, CardHeader, IconButton, makeStyles } from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

const HabitCard = ({ name, lastClicked, currentTime, handleDelete, handleUpdate }) => {
  const getBackgroundColor = () => {
    console.log(currentTime - lastClicked);
    return 'white';
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