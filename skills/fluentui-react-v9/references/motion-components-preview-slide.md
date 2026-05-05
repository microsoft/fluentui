# Motion/Components (preview)/Slide

The `Slide` component manages content presence, using slide in/out transitions.

> **⚠️ Preview components are considered unstable**

```tsx
import { Slide } from '@fluentui/react-motion-components-preview';

function Component({ visible }) {
  return (
    <Slide visible={visible}>
      <div>Content</div>
    </Slide>
  );
}
```

## Examples

### Cards Demo

```tsx
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
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, makeStyles, tokens, Switch } from '@fluentui/react-components';
import { Slide } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"controls ." "card card" / 1fr 1fr`,
    gap: '20px 10px',
  },
  card: {
    gridArea: 'card',
    padding: '10px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    flex: 1,
  },
});

const LoremIpsum = () => (
  <>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
      10,
    )}
  </>
);

export const Default = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(true);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
      </div>

      <Slide visible={visible} outY="20px">
        <div className={classes.card}>
          <LoremIpsum />
        </div>
      </Slide>
    </div>
  );
};
```

### Directions

`Slide` supports directions using `outX` and `outY` props in `px`, `%`, etc.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, Button } from '@fluentui/react-components';
import { Slide } from '@fluentui/react-motion-components-preview';

import {
  ArrowUpFilled,
  ArrowDownFilled,
  ArrowLeftFilled,
  ArrowRightFilled,
  ArrowUpLeftFilled,
  ArrowUpRightFilled,
  ArrowDownLeftFilled,
  ArrowDownRightFilled,
  FluentIcon,
} from '@fluentui/react-icons';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    padding: '20px',
    alignItems: 'flex-start',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '20px',
    flex: '0 0 auto',
  },
  directionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',
    gap: '6px',
  },
  directionButton: {
    height: '44px',
    fontSize: tokens.fontSizeBase200,
    minWidth: '44px',
  },
  centerSpace: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground3,
  },
  demo: {
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: '20px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.colorNeutralBackground2,
    minWidth: '300px',
    minHeight: '200px',
    flex: '1 1 300px',
    overflow: 'hidden',
  },
  card: {
    padding: '20px',
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow8,
    maxWidth: '300px',
    textAlign: 'center',
  },
});

const slideDirections = {
  Top: { outX: '0%', outY: '-100%' },
  'Top-Right': { outX: '100%', outY: '-100%' },
  Right: { outX: '100%', outY: '0%' },
  'Bottom-Right': { outX: '100%', outY: '100%' },
  Bottom: { outX: '0%', outY: '100%' },
  'Bottom-Left': { outX: '-100%', outY: '100%' },
  Left: { outX: '-100%', outY: '0%' },
  'Top-Left': { outX: '-100%', outY: '-100%' },
};

const directionIcons: Record<keyof typeof slideDirections, FluentIcon> = {
  Top: ArrowUpFilled,
  'Top-Right': ArrowUpRightFilled,
  Right: ArrowRightFilled,
  'Bottom-Right': ArrowDownRightFilled,
  Bottom: ArrowDownFilled,
  'Bottom-Left': ArrowDownLeftFilled,
  Left: ArrowLeftFilled,
  'Top-Left': ArrowUpLeftFilled,
};

// Create the grid layout with buttons positioned according to direction
const directionGrid = [
  ['Top-Left', 'Top', 'Top-Right'],
  ['Left', null, 'Right'],
  ['Bottom-Left', 'Bottom', 'Bottom-Right'],
];

export const Directions = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(true);
  const [selectedDirection, setSelectedDirection] = React.useState<keyof typeof slideDirections>('Top');

  const slideParams = slideDirections[selectedDirection as keyof typeof slideDirections];

  const handleDirectionClick = (direction: keyof typeof slideDirections) => {
    setSelectedDirection(direction);
    setVisible(v => !v);
  };

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <div className={classes.directionsGrid}>
          {directionGrid.flat().map(direction => {
            if (direction) {
              const ArrowIconForDirection = directionIcons[direction as keyof typeof directionIcons];
              return (
                <Button
                  key={direction}
                  className={classes.directionButton}
                  appearance={selectedDirection === direction ? 'primary' : 'secondary'}
                  onClick={() => handleDirectionClick(direction as keyof typeof directionIcons)}
                >
                  <ArrowIconForDirection />
                </Button>
              );
            }
            return (
              <div key="center" className={classes.centerSpace}>
                <h4>Click</h4>
              </div>
            );
          })}
        </div>
      </div>

      <div className={classes.demo}>
        <Slide visible={visible} outX={slideParams.outX} outY={slideParams.outY}>
          <div className={classes.card}>
            <p>Slide from {selectedDirection}</p>
            <p>outX = {slideParams.outX}</p>
            <p>outY = {slideParams.outY}</p>
          </div>
        </Slide>
      </div>
    </div>
  );
};
```

### Relaxed

The relaxed variant of `Scale` is available as the `ScaleRelaxed` component.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, makeStyles, tokens, Switch } from '@fluentui/react-components';
import { SlideRelaxed } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"controls ." "card card" / 1fr 1fr`,
    gap: '20px 10px',
  },
  card: {
    gridArea: 'card',
    padding: '10px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    flex: 1,
  },
});

const LoremIpsum = () => (
  <>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
      10,
    )}
  </>
);

export const Relaxed = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(true);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
      </div>

      <SlideRelaxed visible={visible}>
        <div className={classes.card}>
          <LoremIpsum />
        </div>
      </SlideRelaxed>
    </div>
  );
};
```

### Snappy

The snappy variant of `Scale` is available as the `ScaleSnappy` component.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, makeStyles, tokens, Switch } from '@fluentui/react-components';
import { SlideSnappy } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"controls ." "card card" / 1fr 1fr`,
    gap: '20px 10px',
  },
  card: {
    gridArea: 'card',
    padding: '10px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    flex: 1,
  },
});

const LoremIpsum = () => (
  <>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
      10,
    )}
  </>
);

export const Snappy = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(true);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
      </div>

      <SlideSnappy visible={visible}>
        <div className={classes.card}>
          <LoremIpsum />
        </div>
      </SlideSnappy>
    </div>
  );
};
```
