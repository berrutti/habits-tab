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
    setCards(previousCards => [
      ...previousCards,
      {
        name: card.name,
        timeframe: card.timeframe,
        lastClicked: card.lastClicked
      }
    ]) // TODO: Check name uniqueness
  }

  const handleDeleteCard = name => {
    setCards(previousCards => previousCards.filter(card => card.name !== name));
  }

  useEffect(() => {
    chrome.storage.sync.get(['cards'], (result) => {
      if (result.cards) {
        setCards(result.cards)
      }
    });
  });

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
