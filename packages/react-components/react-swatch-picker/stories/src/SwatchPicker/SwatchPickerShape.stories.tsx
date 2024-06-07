import * as React from 'react';
import { makeStyles, SwatchPicker, ColorSwatch } from '@fluentui/react-components';

const useStyles = makeStyles({
  example: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
});

const colors = [
  { color: '#FF1921', value: 'FF1921', 'aria-label': 'red' },
  { color: '#FF7A00', value: 'FF7A00', 'aria-label': 'dark orange' },
  { color: '#FFC12E', value: 'FFC12E', 'aria-label': 'orange' },
  { color: '#90D057', value: '90D057', 'aria-label': 'light green' },
  { color: '#00B053', value: '00B053', 'aria-label': 'green' },
  { color: '#00AFED', value: '00AFED', 'aria-label': 'light blue' },
  { color: '#006EBD', value: '006EBD', 'aria-label': 'blue' },
  { color: '#011F5E', value: '011F5E', 'aria-label': 'dark blue' },
  { color: '#712F9E', value: '712F9E', 'aria-label': 'purple' },
];

export const SwatchPickerShape = () => {
  const styles = useStyles();
  return (
    <div className={styles.example}>
      <h3>Square</h3>
      <SwatchPicker aria-label="SwatchPicker square shape">
        {colors.map(color => (
          <ColorSwatch key={color.value} {...color} />
        ))}
      </SwatchPicker>
      <h3>Circular</h3>
      <SwatchPicker aria-label="SwatchPicker circular shape" shape="circular">
        {colors.map(color => (
          <ColorSwatch key={color.value} {...color} />
        ))}
      </SwatchPicker>
      <h3>Rounded</h3>
      <SwatchPicker aria-label="SwatchPicker rounded shape" shape="rounded">
        {colors.map(color => (
          <ColorSwatch key={color.value} {...color} />
        ))}
      </SwatchPicker>
    </div>
  );
};

SwatchPickerShape.parameters = {
  docs: {
    description: {
      story: 'The `shape` prop sets border-radius of the Swatch. The default is `square`.',
    },
  },
};
