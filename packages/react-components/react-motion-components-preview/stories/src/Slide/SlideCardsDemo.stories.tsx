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

// TODO: reduce samples
// 3 bounces, 95% decay
const springSettleCurve = `linear(0.000, 1.000 25%, 1.038 26%, 1.070 27%, 1.098 28%, 1.121 29%, 1.139 30%, 1.152 31%, 1.161 32%, 1.166 33%, 1.168 34%, 1.166 35%, 1.162 36%, 1.155 37%, 1.146 38%, 1.135 39%, 1.110 41%, 1.056 45%, 1.031 47%, 1.009 49%, 1.000 50%, 0.9916 51%, 0.9843 52%, 0.9781 53%, 0.9730 54%, 0.9690 55%, 0.9639 57%, 0.9624 59%, 0.9638 61%, 0.9674 63%, 0.9753 66%, 0.9903 71%, 0.9979 74%, 1.004 77%, 1.007 80%, 1.008 83%, 1.008 87%, 1.000 99%, 1.000)`;

// 7% anticipation, exponent 3
const anticipationRelaxedCurve = `linear(0.000, -0.001190 3%, -0.004500 6%, -0.01154 10%, -0.02328 15%, -0.04719 24%, -0.05672 28%, -0.06428 32%, -0.06810 35%, -0.06991 38%, -0.06931 41%, -0.06739 43%, -0.06410 45%, -0.05935 47%, -0.05302 49%, -0.04498 51%, -0.03513 53%, -0.02335 55%, -0.009525 57%, 0.006460 59%, 0.02472 61%, 0.04537 63%, 0.06852 65%, 0.09430 67%, 0.1228 69%, 0.1542 71%, 0.1885 73%, 0.2259 75%, 0.2665 77%, 0.3104 79%, 0.3577 81%, 0.4086 83%, 0.4631 85%, 0.5214 87%, 0.5835 89%, 0.6161 90%, 0.6497 91%, 0.6843 92%, 0.7200 93%, 0.7567 94%, 0.7945 95%, 0.8334 96%, 0.8733 97%, 0.9144 98%, 0.9566 99%, 1.000)`;
// 7% anticipation, exponent 2
const anticipationSnappyCurve = `linear(0.000, -0.01307 2%, -0.02479 4%, -0.03517 6%, -0.04419 8%, -0.05186 10%, -0.05818 12%, -0.06316 14%, -0.06678 16%, -0.06905 18%, -0.06998 20%, -0.06955 22%, -0.06777 24%, -0.06465 26%, -0.06017 28%, -0.05435 30%, -0.04717 32%, -0.03864 34%, -0.02877 36%, -0.01754 38%, -0.004966 40%, 0.008960 42%, 0.02424 44%, 0.04086 46%, 0.05884 48%, 0.07816 50%, 0.09884 52%, 0.1209 54%, 0.1442 56%, 0.1690 58%, 0.1950 60%, 0.2225 62%, 0.2512 64%, 0.2814 66%, 0.3128 68%, 0.3457 70%, 0.3798 72%, 0.4154 74%, 0.4522 76%, 0.4904 78%, 0.5300 80%, 0.5709 82%, 0.6132 84%, 0.6568 86%, 0.7018 88%, 0.7481 90%, 0.7958 92%, 0.8448 94%, 0.8952 96%, 0.9469 98%, 1.000)`;

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
            easing={springSettleCurve}
            exitEasing={anticipationRelaxedCurve}
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
