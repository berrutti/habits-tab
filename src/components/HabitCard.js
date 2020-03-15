import React from 'react';

import Card from "@material-ui/core/Card";
import { CardActionArea, CardContent, makeStyles } from "@material-ui/core";

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

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                    {props.name} <br />
                    Last update: {new Date(props.lastClicked).toString()}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default HabitCard;