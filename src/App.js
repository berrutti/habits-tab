import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import HabitCard from './components/card';

export default function App() {
  const [cards] = useState([{ title: 'A new card' }, { title: 'Another card' }, { title: 'Last card' }]);

  /*const addCardHandler = card => {
    setCards(previousCards => [...previousCards, { title: card.title }])
  }*/
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        {cards.map((element, i) => {
          return (<HabitCard key={i} title={element.title} />);
        })}
      </Box>
    </Container>
  );
}
