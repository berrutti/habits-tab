/* global chrome */ // This is needed so ESLint wont cry about it
import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import IconButton from '@material-ui/core/IconButton';
import HabitCard from './components/HabitCard';
import FormDialog from './components/FormDialog';

export default function App() {
  const [cards, setCards] = useState([]);

  const [open, setOpen] = useState(false);

  const handleAddCard = card => {
    setCards(previousCards => {
      const cards = [...previousCards, card];
      chrome.storage.sync.set({ cards }, () => { });
      return cards;
    }) // TODO: Check name uniqueness
  }

  const handleDeleteCard = name => {
    setCards(previousCards => {
      const cards = previousCards.filter(card => card.name !== name);
      chrome.storage.sync.set({ cards }, () => { });
      return cards;
    });
  }

  useEffect(() => {
    chrome.storage.sync.get(['cards'], (data) => {
      if (data.cards) {
        setCards(data.cards);
      }
    })
  }, []);

  return (
    <Container>
      <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center">
        {cards.map((element, i) => {
          return (<HabitCard key={i} name={element.name} lastClicked={element.lastClicked} handleDelete={handleDeleteCard} />);
        })}
      </Box>

      <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center">
        <IconButton aria-label="add-habit" onClick={() => setOpen(true)}>
          <AddCircleOutlineRoundedIcon fontSize="large" />
        </IconButton>
      </Box>


      <FormDialog open={open} handleClose={() => setOpen(false)} handleAddCard={handleAddCard}></FormDialog>
    </Container>
  );
}
