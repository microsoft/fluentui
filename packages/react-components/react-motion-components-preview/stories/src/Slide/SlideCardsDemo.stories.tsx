import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, Button, Card, CardHeader, CardPreview, Body1 } from '@fluentui/react-components';
import { Slide } from '@fluentui/react-motion-components-preview';

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
    outX: '-50px',
    outY: '0px',
  },
  {
    id: 2,
    title: 'Features',
    content: 'Explore the capabilities',
    color: tokens.colorPaletteGreenBackground2,
    outX: '0px',
    outY: '-50px',
  },
  {
    id: 3,
    title: 'Customize',
    content: 'Make it your own',
    color: tokens.colorPalettePurpleBackground2,
    outX: '50px',
    outY: '0px',
  },
  {
    id: 4,
    title: 'Advanced',
    content: 'Pro techniques',
    color: tokens.colorPaletteRedBackground2,
    outX: '-30px',
    outY: '30px',
  },
  {
    id: 5,
    title: 'Examples',
    content: 'Real-world usage',
    color: tokens.colorPalettePeachBackground2,
    outX: '0px',
    outY: '50px',
  },
  {
    id: 6,
    title: 'Resources',
    content: 'Documentation & help',
    color: tokens.colorPaletteLightTealBackground2,
    outX: '30px',
    outY: '30px',
  },
];

// 3 bounces, 95% decay
const curveSpringEnter = `linear(0, 1 25%, 1.070 27%, 1.121 29%, 1.152 31%, 1.166 33%, 1.162 36%, 1.123 40%, 1.031 47%, 0.9916 51%, 0.9690 55%, 0.9628 60%, 1.002 76%, 1.008 87%, 1.000)`;

// 7% anticipation, exponent 3
const curveAnticipationExit = `linear(0, -0.01368 11%, -0.06081 30%, -0.07000 39%, -0.05935 47%, -0.02949 54%, 0.01530 60%, 0.08107 66%, 0.1542 71%, 0.2458 76%, 0.3577 81%, 0.4917 86%, 0.6497 91%, 0.7945 95%, 0.9566 99%, 1.000)`;

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
          <Slide
            key={card.id}
            visible={visibleCards.has(card.id)}
            outX={card.outX}
            outY={card.outY}
            duration={500}
            exitDuration={500}
            easing={curveSpringEnter}
            exitEasing={curveAnticipationExit}
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
          </Slide>
        ))}
      </div>
    </div>
  );
};
