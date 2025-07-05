import * as React from 'react';
import { makeStyles, tokens, Button } from '@fluentui/react-components';
import { Slide } from '@fluentui/react-motion-components-preview';
import SlideDirectionsDescription from './SlideDirections.stories.md';
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
    // border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '20px',
    // minWidth: '250px',
    flex: '0 0 auto',
  },
  directionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',
    gap: '6px',
    // width: '150px',
    // height: '150px',
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
  Top: { fromX: '0%', fromY: '-100%' },
  'Top-Right': { fromX: '100%', fromY: '-100%' },
  Right: { fromX: '100%', fromY: '0%' },
  'Bottom-Right': { fromX: '100%', fromY: '100%' },
  Bottom: { fromX: '0%', fromY: '100%' },
  'Bottom-Left': { fromX: '-100%', fromY: '100%' },
  Left: { fromX: '-100%', fromY: '0%' },
  'Top-Left': { fromX: '-100%', fromY: '-100%' },
};

const directionIcons = {
  Top: ArrowUpFilled,
  'Top-Right': ArrowUpRightFilled,
  Right: ArrowRightFilled,
  'Bottom-Right': ArrowDownRightFilled,
  Bottom: ArrowDownFilled,
  'Bottom-Left': ArrowDownLeftFilled,
  Left: ArrowLeftFilled,
  'Top-Left': ArrowUpLeftFilled,
};

export const Directions = () => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(true);
  const [selectedDirection, setSelectedDirection] = React.useState<string>('Top');

  const slideParams = slideDirections[selectedDirection as keyof typeof slideDirections];

  const handleDirectionClick = (direction: string) => {
    setSelectedDirection(direction);
    setVisible(v => !v);
  };

  // Create the grid layout with buttons positioned according to direction
  const directionGrid = [
    ['Top-Left', 'Top', 'Top-Right'],
    ['Left', null, 'Right'],
    ['Bottom-Left', 'Bottom', 'Bottom-Right'],
  ];

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <div className={classes.directionsGrid}>
          {directionGrid.flat().map((direction, index) => {
            if (direction) {
              const ArrowIconForDirection = directionIcons[direction as keyof typeof directionIcons];
              return (
                <Button
                  key={direction}
                  className={classes.directionButton}
                  appearance={selectedDirection === direction ? 'primary' : 'secondary'}
                  onClick={() => handleDirectionClick(direction)}
                >
                  <ArrowIconForDirection />
                </Button>
              );
            }
            return (
              <div key={index} className={classes.centerSpace}>
                <h4>Click</h4>
              </div>
            );
          })}
        </div>
      </div>

      <div className={classes.demo}>
        <Slide visible={visible} fromX={slideParams.fromX} fromY={slideParams.fromY}>
          <div className={classes.card}>
            <p>Slide from {selectedDirection}</p>
            <p>fromX = {slideParams.fromX}</p>
            <p>fromY = {slideParams.fromY}</p>
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
