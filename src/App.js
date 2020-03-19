/* global chrome */ // This is needed so ESLint wont cry about it
import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import IconButton from '@material-ui/core/IconButton';
import HabitCard from './components/HabitCard';
import AddCardDialog from './components/AddCardDialog';
import useInterval from './hooks/useInterval';
import getCurrentMiliseconds from './utils/miliseconds'
import ConfirmDeleteDialog from './components/ConfirmDeleteDialog';

export default function App() {
  const [cards, setCards] = useState([]);
  const [addCardOpen, setAddCardOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(getCurrentMiliseconds());

  useInterval(() => {
    setCurrentTime(getCurrentMiliseconds());
  }, 5000);

  useEffect(() => {
    chrome.storage.onChanged.addListener((changes) => {
      setCards(changes['cards'].newValue);
    });
  }, []);


  const handleAddCard = card => {
    chrome.storage.sync.set({ cards: [...cards, card] });
  }

  const handleDeleteCard = name => {
    chrome.storage.sync.set({ cards: cards.filter(card => card.name !== name) });
  }

  const handleUpdateCard = name => {
    const cardToUpdate = cards.find(currentCard => currentCard.name === name);
    cardToUpdate.lastClicked = getCurrentMiliseconds();
    chrome.storage.sync.set({ cards });
  }

  const handleConfirm = (answer) => {
    
  }

  useEffect(() => {
    chrome.storage.sync.get(['cards'], (data) => {
      if (data.cards) setCards(data.cards);
    })
  }, []);

  return (
    <Container>
      <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center">
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

      <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center">
        <IconButton aria-label="add-habit" onClick={() => setAddCardOpen(true)}>
          <AddCircleOutlineRoundedIcon fontSize="large" />
        </IconButton>
      </Box>

      <AddCardDialog open={addCardOpen} handleClose={() => setAddCardOpen(false)} handleAddCard={handleAddCard}></AddCardDialog>

      <ConfirmDeleteDialog open={confirmDialogOpen} handleClose={handleConfirm}></ConfirmDeleteDialog>
    </Container>
  );
}
