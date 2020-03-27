import React, { useState, useEffect, Fragment } from 'react';
import { Container, Box, Fab, makeStyles } from '@material-ui/core';
import { AddCircle, Help } from '@material-ui/icons';
import { getCurrentMiliseconds } from './utils/functions'
import HabitCard from './components/HabitCard';
import AddCardDialog from './components/AddCardDialog';
import ConfirmDeleteDialog from './components/ConfirmDeleteDialog';
import HelpDialog from './components/HelpDialog';
import useInterval from './hooks/useInterval';
import { Card } from './utils/types';

export default function App() {
  const useStyles = makeStyles(() => ({
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

  const [cards, setCards] = useState<Card[]>([]);
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

  const handleAddCard = (card: Card): void => {
    chrome.storage.sync.set({ cards: [...cards, card] });
  }

  function handleDeleteCard(name: string): void {
    setCardToDelete(name);
    setConfirmDialogOpen(true);
  }

  const deleteCard = (): void => {
    setConfirmDialogOpen(false);
    chrome.storage.sync.set({ cards: cards.filter(card => card.name !== cardToDelete) }, () => {
      setCardToDelete('');
    });
  }

  const handleUpdateCard = (name: string): void => {
    const cardToUpdate = cards.find(currentCard => currentCard.name === name);
    if (cardToUpdate) {
      cardToUpdate.lastClicked = getCurrentMiliseconds();
    }
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
                timeframe={element.timeframe}
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
          handleClose={(): void => setShowHelp(false)} />

        <AddCardDialog
          open={addCardOpen}
          handleClose={(): void => setAddCardOpen(false)}
          handleAddCard={handleAddCard} />

        <ConfirmDeleteDialog
          open={confirmDialogOpen}
          handleConfirm={deleteCard}
          handleClose={(): void => setConfirmDialogOpen(false)} />

      </Container>

      <Fab className={classes.addIcon} color="primary" onClick={(): void => setAddCardOpen(true)} aria-label="add-habit"><AddCircle /></Fab>
      <Fab className={classes.helpIcon} color="primary" onClick={(): void => setShowHelp(true)} aria-label="show-help"><Help /></Fab>

    </Fragment>
  );
}
