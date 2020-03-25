/* global chrome */ // This is needed so ESLint wont cry about it
import React, { useState, useEffect, Fragment } from 'react';
import { Container, Box, Fab, makeStyles } from '@material-ui/core';
import { AddCircle, Help } from '@material-ui/icons';
import { getCurrentMiliseconds } from './utils/functions'
import HabitCard from './components/HabitCard';
import AddCardDialog from './components/AddCardDialog';
import ConfirmDeleteDialog from './components/ConfirmDeleteDialog';
import HelpDialog from './components/HelpDialog';
import useInterval from './hooks/useInterval';

export default function App() {
  const useStyles = makeStyles((theme) => ({
    addIcon: {
      position: 'fixed',
      right: '12px',
      bottom: '12px',
    },
    helpIcon: {
      position: 'fixed',
      right: '80px',
      bottom: '12px',
    },
  }));
  const classes = useStyles();

  const [cards, setCards] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  const [addCardOpen, setAddCardOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState('');
  const [currentTime, setCurrentTime] = useState(getCurrentMiliseconds());

  useInterval(() => {
    setCurrentTime(getCurrentMiliseconds());
  }, 5000);

  useEffect(() => {
    chrome.storage.onChanged.addListener((changes) => {
      setCards(changes['cards'].newValue);
    });
  }, []);

  useEffect(() => {
    chrome.storage.sync.get(['cards'], (data) => {
      if (data.cards) setCards(data.cards);
    })
  }, []);

  const handleAddCard = card => {
    chrome.storage.sync.set({ cards: [...cards, card] });
  }

  const handleDeleteCard = name => {
    setCardToDelete(name);
    setConfirmDialogOpen(true);
  }

  const deleteCard = () => {
    setConfirmDialogOpen(false);
    chrome.storage.sync.set({ cards: cards.filter(card => card.name !== cardToDelete) }, () => {
      setCardToDelete('');
    });
  }

  const handleUpdateCard = name => {
    const cardToUpdate = cards.find(currentCard => currentCard.name === name);
    cardToUpdate.lastClicked = getCurrentMiliseconds();
    chrome.storage.sync.set({ cards });
  }

  return (
    <Fragment>
      <Container>
        <Box display='flex' flexWrap='wrap' justifyContent='center' alignItems='center'>
          {cards.map((element, i) => {
            return (
              <HabitCard
                key={i}
                name={element.name}
                timeframe={parseInt(element.timeframe)}
                lastClicked={element.lastClicked}
                currentTime={currentTime}
                handleDelete={handleDeleteCard}
                handleUpdate={handleUpdateCard}
              />
            );
          })}
        </Box>

        <HelpDialog
          open={showHelp}
          handleClose={() => setShowHelp(false)}>
        </HelpDialog>

        <AddCardDialog
          open={addCardOpen}
          handleClose={() => setAddCardOpen(false)}
          handleAddCard={handleAddCard}>
        </AddCardDialog>

        <ConfirmDeleteDialog
          open={confirmDialogOpen}
          handleConfirm={deleteCard}
          handleClose={() => setConfirmDialogOpen(false)}>
        </ConfirmDeleteDialog>
      </Container>

      <Fab className={classes.addIcon} color="primary" onClick={() => setAddCardOpen(true)} aria-label="add-habit"><AddCircle /></Fab>
      <Fab className={classes.helpIcon} color="primary" onClick={() => setShowHelp(true)} aria-label="show-help"><Help /></Fab>

    </Fragment>
  );
}
