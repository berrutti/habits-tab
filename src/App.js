/* global chrome */ // This is needed so ESLint wont cry about it
import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import IconButton from '@material-ui/core/IconButton';
import HabitCard from './components/HabitCard';
import FormDialog from './components/FormDialog';

export default function App() {
  const [cards, setCards] = useState([
    { name: 'A new card', timeframe: 'daily', lastClicked: new Date().getTime() },
    { name: 'Another card', timeframe: 'weekly', lastClicked: new Date().getTime() },
    { name: 'Last card', timeframe: 'monthly', lastClicked: new Date().getTime() }
  ]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddCard = card => {
    setCards(previousCards => [...previousCards, { name: card.name, timeframe: card.timeframe, lastClicked: card.lastClicked }]) // TODO: Check name uniqueness
  }

  const handleDeleteCard = name => {
    setCards(previousCards => previousCards.filter(card => card.name !== name));
  }

  const loadChromeBrowserData = () => {
    if (chrome) {
      chrome.storage.sync.get(['cards'], (result) => {
        console.log('The cards are ' + result.cards);
      });
    }
  }

  return (
    <Container>
      <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center">
        {cards.map((element, i) => {
          return (<HabitCard key={i} name={element.name} lastClicked={element.lastClicked} handleDelete={handleDeleteCard} />);
        })}
      </Box>

      <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center">
        <IconButton aria-label="add-habit" onClick={handleOpen}>
          <AddCircleOutlineRoundedIcon fontSize="large" />
        </IconButton>
      </Box>


      <FormDialog open={open} handleOpen={handleOpen} handleClose={handleClose} handleAddCard={handleAddCard}></FormDialog>
    </Container>
  );
}
