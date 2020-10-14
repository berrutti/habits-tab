import React, { useState, useEffect, Fragment } from 'react';
import { Container, Box, Fab, makeStyles, Accordion, AccordionSummary, Typography, AccordionDetails } from '@material-ui/core';
import { AddCircle, ExpandMore, Settings } from '@material-ui/icons';
import { getCurrentMilliseconds } from './utils/functions'
import HabitCard from './components/HabitCard';
import AddCardDialog from './components/AddCardDialog';
import ConfirmDialog from './components/ConfirmDialog';
import SettingsDialog from './components/SettingsDialog';
import useInterval from './hooks/useInterval';
import { Card } from './utils/types';
import WeightChart from './components/WeightChart';

export default function App() {
  const useStyles = makeStyles(() => ({
    emptyHeader: {
      color: '#222'
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
  const weightData = [
    { date: '2020-09-09', weight: 85 },
    { date: '2020-09-10', weight: 84 },
    { date: '2020-09-11', weight: 83 },
    { date: '2020-09-12', weight: 82 },
    { date: '2020-09-13', weight: 81.5 },
    { date: '2020-09-14', weight: 81 },
    { date: '2020-09-15', weight: 80.8 },
  ];
  const [cards, setCards] = useState<Card[]>([]);
  const [expanded, setExpanded] = useState<string>('cards');
  const [trackWeight, setTrackWeight] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState(false);
  const [addCardOpen, setAddCardOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState('');
  const [currentTime, setCurrentTime] = useState(getCurrentMilliseconds());

  useInterval(() => {
    setCurrentTime(getCurrentMilliseconds());
  }, 5000);

  useEffect(() => {
    chrome.storage.onChanged.addListener((changes) => {
      if (changes['cards']) {
        setCards(changes['cards'].newValue);
      }
      if (changes['trackWeight']) {
        setTrackWeight(changes['trackWeight'].newValue);
      }
    });
  }, []);

  useEffect(() => {
    chrome.storage.sync.get(['cards', 'trackWeight'], (data) => {
      if (data.cards) {
        setCards(data.cards);
      }
      if (data.trackWeight) {
        setTrackWeight(data.trackWeight);
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
      cardToUpdate.lastClicked = getCurrentMilliseconds();
    }
    chrome.storage.sync.set({ cards });
  }

  const handleValueChange = (event: any): void => {
    const name = event.target.name;
    const checked = event.target.checked;

    chrome.storage.sync.set({ [name]: checked });
  }

  const handlePanelChanges = (panel: string) => (_: object, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : '');
  };

  return (
    <Fragment>
      <Container>

        <Accordion expanded={expanded === 'habits'} onChange={handlePanelChanges('habits')}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="cards-content"
            id="cards-header"
          >
            <Typography>Habits</Typography>
          </AccordionSummary>
          <AccordionDetails>
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
          </AccordionDetails>
        </Accordion>
        {trackWeight && <Accordion expanded={expanded === 'weight'} onChange={handlePanelChanges('weight')}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="weight-content"
            id="weight-header"
          >
            <Typography>Weight</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <WeightChart data={weightData}></WeightChart>
          </AccordionDetails>
        </Accordion>}


        <SettingsDialog
          open={showSettings}
          trackWeight={trackWeight}
          handleValueChange={handleValueChange}
          handleClose={(): void => setShowSettings(false)} />

        <AddCardDialog
          open={addCardOpen}
          handleClose={(): void => setAddCardOpen(false)}
          handleAddCard={handleAddCard} />

        <ConfirmDialog
          open={confirmDialogOpen}
          title='Are you sure you want to delete this Habit?'
          message='This action is cannot be undone'
          handleConfirm={deleteCard}
          handleClose={(): void => setConfirmDialogOpen(false)} />

      </Container>

      <Fab className={classes.addIcon} color="primary" onClick={(): void => setAddCardOpen(true)} aria-label="add-habit"><AddCircle /></Fab>
      <Fab className={classes.settingsIcon} color="primary" onClick={(): void => setShowSettings(true)} aria-label="show-settings"><Settings /></Fab>

    </Fragment>
  );
}
