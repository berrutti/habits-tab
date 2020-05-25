import React, { useState, useEffect, Fragment } from 'react';
import { Container, Box, Fab, makeStyles } from '@material-ui/core';
import { AddCircle, Settings } from '@material-ui/icons';
import { getCurrentMiliseconds } from './utils/functions'
import HabitCard from './components/HabitCard';
import AddCardDialog from './components/AddCardDialog';
import ConfirmDeleteDialog from './components/ConfirmDeleteDialog';
import SettingsDialog from './components/SettingsDialog';
import useInterval from './hooks/useInterval';
import { Card } from './utils/types';

export default function App() {
  const useStyles = makeStyles(() => ({
    emptyHeader: {
      color: 'white'
    },
    addIcon: {
      position: 'fixed',
      right: '12px',
      bottom: '12px',
    },
    settingsIcon: {
      position: 'fixed',
      right: '80px',
      bottom: '12px',
    },
  }));
  const classes = useStyles();

  const [cards, setCards] = useState<Card[]>([]);
  const [hidden, setHidden] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState(false);
  const [addCardOpen, setAddCardOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState('');
  const [currentTime, setCurrentTime] = useState(getCurrentMiliseconds());

  useInterval(() => {
    setCurrentTime(getCurrentMiliseconds());
  }, 5000);

  useEffect(() => {
    chrome.storage.onChanged.addListener((changes) => {
      if (changes['cards']) {
        setCards(changes['cards'].newValue);
      }
      if (changes['hidden']) {
        setHidden(changes['hidden'].newValue);
      }
    });
  }, []);

  useEffect(() => {
    chrome.storage.sync.get(['cards', 'hidden'], (data) => {
      if (data.cards) {
        setCards(data.cards);
      }
      if (data.hidden) {
        setHidden(data.hidden);
      }
    });
  }, []);

  const handleAddCard = (card: Card): void => {
    chrome.storage.sync.set({ cards: [...cards, card] });
  }

  const handleDeleteCard = (name: string): void => {
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

  const handleSetHidden = (event: any): void => {
    const hidden = event.target.checked;
    chrome.storage.sync.set({ hidden });
  }

  return (
    <Fragment>
      <Container>

        {!hidden && 
          <Box display='flex' flexWrap='wrap' justifyContent='center' alignItems='center'>
            {cards.length ? cards.map((element, i) => {
              return (
                <HabitCard
                  key={i}
                  card={element}
                  currentTime={currentTime}
                  handleDelete={handleDeleteCard}
                  handleUpdate={handleUpdateCard}
                />
              );
            }) : <h1 className={classes.emptyHeader}>Add a New Habit by clicking the + button</h1>}
          </Box>
        }

        <SettingsDialog
          open={showSettings}
          hidden={hidden}
          handleSetHidden={handleSetHidden}
          handleClose={(): void => setShowSettings(false)} />

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
      <Fab className={classes.settingsIcon} color="primary" onClick={(): void => setShowSettings(true)} aria-label="show-settings"><Settings /></Fab>

    </Fragment>
  );
}
