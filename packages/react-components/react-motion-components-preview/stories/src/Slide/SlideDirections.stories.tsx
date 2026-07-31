import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button } from '@fluentui/react-components';
import { Slide } from '@fluentui/react-motion-components-preview';
import SlideDirectionsDescription from './SlideDirections.stories.md';
import type { FluentIcon } from '@fluentui/react-icons';
import {
  ArrowUpFilled,
  ArrowDownFilled,
  ArrowLeftFilled,
  ArrowRightFilled,
  ArrowUpLeftFilled,
  ArrowUpRightFilled,
  ArrowDownLeftFilled,
  ArrowDownRightFilled,
} from '@fluentui/react-icons';

import styles from './SlideDirections.module.css';

const useClasses = () => styles;

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

Directions.parameters = {
  docs: {
    description: {
      story: SlideDirectionsDescription,
    },
  },
};
