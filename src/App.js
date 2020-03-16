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

  return (
    <Container>
      <Box my={4}>
        {cards.map((element, i) => {
          return (<HabitCard key={i} name={element.name} lastClicked={element.lastClicked} handleDelete={handleDeleteCard} />);
        })}
      </Box>

      <IconButton aria-label="delete" className='margin' onClick={handleOpen}>
        <AddCircleOutlineRoundedIcon fontSize="large" />
      </IconButton>

      <FormDialog open={open} handleOpen={handleOpen} handleClose={handleClose} handleAddCard={handleAddCard}></FormDialog>
    </Container>
  );
}
