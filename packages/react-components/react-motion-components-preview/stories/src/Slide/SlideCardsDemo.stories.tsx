import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, Button, Card, CardHeader, CardPreview, Body1 } from '@fluentui/react-components';
import { SlideRelaxed } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
    maxWidth: '800px',
  },
  controls: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },

  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    alignItems: 'start',
  },
  card: {
    height: '150px',
  },
  cardPreview: {
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: tokens.fontSizeBase600,
  },
});

const cardData = [
  {
    id: 1,
    title: 'Welcome',
    content: 'Getting started',
    color: tokens.colorPaletteBlueBackground2,
    fromX: '-50px',
    fromY: '0px',
  },
  {
    id: 2,
    title: 'Features',
    content: 'Explore the capabilities',
    color: tokens.colorPaletteGreenBackground2,
    fromX: '0px',
    fromY: '-50px',
  },
  {
    id: 3,
    title: 'Customize',
    content: 'Make it your own',
    color: tokens.colorPalettePurpleBackground2,
    fromX: '50px',
    fromY: '0px',
  },
  {
    id: 4,
    title: 'Advanced',
    content: 'Pro techniques',
    color: tokens.colorPaletteRedBackground2,
    fromX: '-30px',
    fromY: '30px',
  },
  {
    id: 5,
    title: 'Examples',
    content: 'Real-world usage',
    color: tokens.colorPalettePeachBackground2,
    fromX: '0px',
    fromY: '50px',
  },
  {
    id: 6,
    title: 'Resources',
    content: 'Documentation & help',
    color: tokens.colorPaletteLightTealBackground2,
    fromX: '30px',
    fromY: '30px',
  },
];

export const CardsDemo = (): JSXElement => {
  const classes = useClasses();
  const [visibleCards, setVisibleCards] = React.useState<Set<number>>(() => new Set(cardData.map(card => card.id)));

  const toggleCard = (cardId: number) => {
    setVisibleCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const showAll = () => {
    setVisibleCards(new Set(cardData.map(card => card.id)));
  };

  const hideAll = () => {
    setVisibleCards(new Set());
  };

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Button onClick={showAll}>Show All</Button>
        <Button onClick={hideAll}>Hide All</Button>
        {cardData.map(card => (
          <Button
            key={card.id}
            size="small"
            appearance={visibleCards.has(card.id) ? 'primary' : 'secondary'}
            onClick={() => toggleCard(card.id)}
          >
            {card.id}
          </Button>
        ))}
      </div>

      <div className={classes.cardGrid}>
        {cardData.map(card => (
          <SlideRelaxed
            key={card.id}
            visible={visibleCards.has(card.id)}
            fromX={card.fromX}
            fromY={card.fromY}
            duration={350}
            exitDuration={250}
          >
            <Card className={classes.card}>
              <CardPreview className={classes.cardPreview} style={{ backgroundColor: card.color }}>
                {card.id}
              </CardPreview>
              <CardHeader
                header={
                  <Body1>
                    <strong>{card.title}</strong>
                  </Body1>
                }
                description={<Body1>{card.content}</Body1>}
              />
            </Card>
          </SlideRelaxed>
        ))}
      </div>
    </div>
  );
};
