import * as React from 'react';
import {
  makeStyles,
  tokens,
  Button,
  Card,
  CardHeader,
  CardPreview,
  Body1,
  Title3,
  Caption1,
} from '@fluentui/react-components';
import { Rotate } from '@fluentui/react-motion-components-preview';
import { Star20Filled, ThumbLike20Filled, Eye20Filled } from '@fluentui/react-icons';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
    maxWidth: '900px',
  },
  controls: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    marginBottom: '20px',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    perspective: '1000px',
  },
  cardContainer: {
    position: 'relative',
    height: '200px',
  },
  card: {
    height: '100%',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: tokens.shadow28,
    },
  },
  cardPreview: {
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: tokens.fontSizeBase600,
    position: 'relative',
  },
  cardBack: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingVerticalM,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: tokens.spacingVerticalS,
  },
  stats: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    alignItems: 'center',
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXS,
  },
});

const cardData = [
  {
    id: 1,
    title: 'Design System',
    subtitle: 'Fluent UI Components',
    color: tokens.colorPaletteBlueBackground2,
    stats: { likes: 324, views: 1205, rating: 4.8 },
    description: 'A comprehensive design system for modern applications',
  },
  {
    id: 2,
    title: 'React Motion',
    subtitle: 'Animation Library',
    color: tokens.colorPaletteGreenBackground2,
    stats: { likes: 156, views: 892, rating: 4.6 },
    description: 'Smooth and performant animations for React components',
  },
  {
    id: 3,
    title: 'TypeScript',
    subtitle: 'Type Safety',
    color: tokens.colorPalettePurpleBackground2,
    stats: { likes: 445, views: 2103, rating: 4.9 },
    description: 'Strongly typed JavaScript for better development experience',
  },
];

export const CardFlip = () => {
  const classes = useClasses();
  const [flippedCards, setFlippedCards] = React.useState<Set<number>>(new Set());
  const [autoFlip, setAutoFlip] = React.useState(false);

  const toggleCard = (cardId: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const flipAllCards = () => {
    if (flippedCards.size === cardData.length) {
      setFlippedCards(new Set());
    } else {
      setFlippedCards(new Set(cardData.map(card => card.id)));
    }
  };

  React.useEffect(() => {
    if (!autoFlip) return;

    const interval = setInterval(() => {
      const randomCard = cardData[Math.floor(Math.random() * cardData.length)];
      toggleCard(randomCard.id);
    }, 1500);

    return () => clearInterval(interval);
  }, [autoFlip]);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Button appearance="primary" onClick={flipAllCards}>
          {flippedCards.size === cardData.length ? 'Flip All Back' : 'Flip All Cards'}
        </Button>
        <Button appearance={autoFlip ? 'primary' : 'secondary'} onClick={() => setAutoFlip(!autoFlip)}>
          {autoFlip ? 'Stop Auto Flip' : 'Auto Flip'}
        </Button>
      </div>

      <div className={classes.cardGrid}>
        {cardData.map(card => (
          <div key={card.id} className={classes.cardContainer}>
            <Rotate
              visible={!flippedCards.has(card.id)}
              axis="Y"
              enterAngle={0}
              exitAngle={180}
              duration={600}
              easing="cubic-bezier(0.4, 0, 0.2, 1)"
            >
              <Card className={classes.card} onClick={() => toggleCard(card.id)}>
                <CardPreview className={classes.cardPreview} style={{ backgroundColor: card.color }}>
                  <Title3>{card.title}</Title3>
                </CardPreview>
                <CardHeader header={<Body1>{card.title}</Body1>} description={<Caption1>{card.subtitle}</Caption1>} />
              </Card>
            </Rotate>

            <Rotate
              visible={flippedCards.has(card.id)}
              axis="Y"
              enterAngle={-180}
              exitAngle={0}
              duration={600}
              easing="cubic-bezier(0.4, 0, 0.2, 1)"
            >
              <div className={classes.cardBack} onClick={() => toggleCard(card.id)}>
                <Title3>{card.title}</Title3>
                <Body1 style={{ textAlign: 'center', margin: tokens.spacingVerticalM }}>{card.description}</Body1>
                <div className={classes.stats}>
                  <div className={classes.statItem}>
                    <ThumbLike20Filled color={tokens.colorPaletteRedForeground2} />
                    <Caption1>{card.stats.likes}</Caption1>
                  </div>
                  <div className={classes.statItem}>
                    <Eye20Filled color={tokens.colorPaletteBlueForeground2} />
                    <Caption1>{card.stats.views}</Caption1>
                  </div>
                  <div className={classes.statItem}>
                    <Star20Filled color={tokens.colorPaletteYellowForeground2} />
                    <Caption1>{card.stats.rating}</Caption1>
                  </div>
                </div>
              </div>
            </Rotate>
          </div>
        ))}
      </div>
    </div>
  );
};

CardFlip.parameters = {
  docs: {
    description: {
      story:
        'Demonstrates card flip animations using Y-axis rotation. Click cards to flip them and reveal additional information on the back.',
    },
  },
};
