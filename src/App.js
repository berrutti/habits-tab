/* global chrome */ // This is needed so ESLint wont cry about it
import React, { useState, useEffect } from 'react';
import { Container, Box, IconButton } from '@material-ui/core';
import { AddCircleOutlineRounded } from '@material-ui/icons';
import { getCurrentMiliseconds } from './utils/functions'
import HabitCard from './components/HabitCard';
import AddCardDialog from './components/AddCardDialog';
import ConfirmDeleteDialog from './components/ConfirmDeleteDialog';
import useInterval from './hooks/useInterval';

export default function App() {
  const [cards, setCards] = useState([]);
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

  const isFormValid = name => {
    let isUnique = true;
    cards.forEach(card => {
      if (card.name === name) {
        isUnique = false;
      }
    })
    return isUnique;
  }

  return (
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

      <Box display='flex' flexWrap='wrap' justifyContent='center' alignItems='center' color='white'>
        <IconButton aria-label='add-habit' onClick={() => setAddCardOpen(true)}>
          <AddCircleOutlineRounded fontSize='large' />
        </IconButton>
      </Box>

      <AddCardDialog
        open={addCardOpen}
        validate={isFormValid}
        handleClose={() => setAddCardOpen(false)}
        handleAddCard={handleAddCard}>
      </AddCardDialog>

      <ConfirmDeleteDialog
        open={confirmDialogOpen}
        handleConfirm={deleteCard}
        handleClose={() => setConfirmDialogOpen(false)}
      >

      </ConfirmDeleteDialog>
    </Container>
  );
}
