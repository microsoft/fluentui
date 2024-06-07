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
  { color: '#FF7A00', value: 'FF7A00', 'aria-label': 'orange' },
  { color: '#90D057', value: '90D057', 'aria-label': 'light green' },
  { color: '#00B053', value: '00B053', 'aria-label': 'green' },
  { color: '#00AFED', value: '00AFED', 'aria-label': 'light blue' },
  { color: '#006EBD', value: '006EBD', 'aria-label': 'blue' },
  { color: '#011F5E', value: '011F5E', 'aria-label': 'dark blue' },
  { color: '#712F9E', value: '712F9E', 'aria-label': 'purple' },
];

export const SwatchPickerSize = () => {
  const styles = useStyles();
  return (
    <div className={styles.example}>
      <h3>Large</h3>
      <SwatchPicker aria-label="SwatchPicker large size" size="large">
        {colors.map(color => {
          return <ColorSwatch key={color.value} {...color} />;
        })}
      </SwatchPicker>
      <h3>Medium</h3>
      <SwatchPicker aria-label="SwatchPicker medium size">
        {colors.map(color => {
          return <ColorSwatch key={color.value} {...color} />;
        })}
      </SwatchPicker>
      <h3>Small</h3>
      <SwatchPicker aria-label="SwatchPicker small size" size="small">
        {colors.map(color => {
          return <ColorSwatch key={color.value} {...color} />;
        })}
      </SwatchPicker>
      <h3>Extra small</h3>
      <SwatchPicker aria-label="SwatchPicker extra small size" size="extra-small">
        {colors.map(color => {
          return <ColorSwatch key={color.value} {...color} />;
        })}
      </SwatchPicker>
    </div>
  );
};

SwatchPickerSize.parameters = {
  docs: {
    description: {
      story:
        'The `size` prop sets width and height of the Swatch. The default is `medium` which is 28x28px. `extra-small` is 20x20px, `small` is 24x24px, `large` is 32x32px.',
    },
  },
};
