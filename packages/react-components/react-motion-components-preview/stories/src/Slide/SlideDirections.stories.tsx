import * as React from 'react';
import { Field, makeStyles, tokens, Button, Dropdown, Option } from '@fluentui/react-components';
import { Slide } from '@fluentui/react-motion-components-preview';
import SlideDirectionsDescription from './SlideDirections.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"controls ." "demo demo" / 300px 1fr`,
    gap: '20px 10px',
    height: '400px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',
    gap: '10px',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '15px',
  },
  demo: {
    gridArea: 'demo',
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: '20px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.colorNeutralBackground2,
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
  field: {
    flex: '0 0 auto',
  },
});

const slideDirections = {
  'Slide from Top (px)': { fromX: '0px', fromY: '-40px' },
  'Slide from Bottom (px)': { fromX: '0px', fromY: '40px' },
  'Slide from Left (px)': { fromX: '-40px', fromY: '0px' },
  'Slide from Right (px)': { fromX: '40px', fromY: '0px' },
  'Slide from Top-Left (px)': { fromX: '-30px', fromY: '-30px' },
  'Slide from Top-Right (px)': { fromX: '30px', fromY: '-30px' },
  'Slide from Bottom-Left (px)': { fromX: '-30px', fromY: '30px' },
  'Slide from Bottom-Right (px)': { fromX: '30px', fromY: '30px' },
  'Slide from Top (100%)': { fromX: '0%', fromY: '-100%' },
  'Slide from Bottom (100%)': { fromX: '0%', fromY: '100%' },
  'Slide from Left (100%)': { fromX: '-100%', fromY: '0%' },
  'Slide from Right (100%)': { fromX: '100%', fromY: '0%' },
  'Slide from Top (50%)': { fromX: '0%', fromY: '-50%' },
  'Slide from Left (50%)': { fromX: '-50%', fromY: '0%' },
};

export const Directions = () => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(true);
  const [selectedDirection, setSelectedDirection] = React.useState<string>('Slide from Top (px)');

  const slideParams = slideDirections[selectedDirection as keyof typeof slideDirections];

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field} label="Slide Direction">
          <Dropdown
            value={selectedDirection}
            onOptionSelect={(_, data) => setSelectedDirection(data.optionValue as string)}
          >
            {Object.keys(slideDirections).map(direction => (
              <Option key={direction} value={direction}>
                {direction}
              </Option>
            ))}
          </Dropdown>
        </Field>

        <Button onClick={() => setVisible(v => !v)}>Toggle Animation</Button>
      </div>

      <div className={classes.demo}>
        <Slide visible={visible} fromX={slideParams.fromX} fromY={slideParams.fromY}>
          <div className={classes.card}>
            <p>{selectedDirection}</p>
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
