/* global chrome */ // This is needed so ESLint wont cry about it
import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import IconButton from '@material-ui/core/IconButton';
import HabitCard from './components/HabitCard';
import FormDialog from './components/FormDialog';
import useInterval from './hooks/useInterval';

export default function App() {
  const [cards, setCards] = useState([]);

  const [open, setOpen] = useState(false);

  const [currentTime, setCurrentTime] = useState(new Date());

  useInterval(() => {
    const now = new Date().getTime();
    console.log('Nos is now',now);
    setCurrentTime(now);
  }, 5000);

  useEffect(() => {
    console.log('Use event listener')
    chrome.storage.onChanged.addListener((changes, namespace) => {
      console.log('added new cards', changes)
      console.log('added new namespace', namespace)
      //setCards(changes['cards'].newValue)
    });
  }, []);
  

  const handleAddCard = card => {
    console.log('Add card')
    setCards(previousCards => {
      const cards = [...previousCards, card];
      chrome.storage.sync.set({ cards }, () => { });
      return cards;
    }) // TODO: Check name uniqueness
  }

  const handleDeleteCard = name => {
    console.log('Delete card')
    setCards(previousCards => {
      const cards = previousCards.filter(card => card.name !== name);
      chrome.storage.sync.set({ cards }, () => { });
      return cards;
    });
  }

  const handleUpdateCard = name => {
    setCards(previousCards => {
      const card = previousCards.find(card => card.name === name);
      card.lastClicked = new Date().getTime();
      console.log('Updated card',name, card.lastClicked)
      chrome.storage.sync.set({ cards }, () => { });
      return cards;
    });
  }

  useEffect(() => {
    console.log('Use effect get cards')
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
          return (
            <HabitCard
              key={i}
              name={element.name}
              lastClicked={element.lastClicked}
              currentTime={currentTime}
              handleDelete={handleDeleteCard}
              handleUpdate={handleUpdateCard}
            />
          );
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
