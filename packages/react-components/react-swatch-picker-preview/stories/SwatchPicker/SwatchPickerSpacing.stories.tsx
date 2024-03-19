import * as React from 'react';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { SwatchPicker, ColorSwatch } from '@fluentui/react-swatch-picker-preview';

const useStyles = makeStyles({
  example: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('10px'),
  },
});

const colors = [
  { color: '#FF1921', value: 'FF1921', 'aria-label': 'red' },
  { color: '#FFC12E', value: 'FFC12E', 'aria-label': 'orange' },
  { color: '#FEFF37', value: 'FEFF37', 'aria-label': 'yellow' },
  { color: '#90D057', value: '90D057', 'aria-label': 'light green' },
  { color: '#00B053', value: '00B053', 'aria-label': 'green' },
  { color: '#00AFED', value: '00AFED', 'aria-label': 'light blue' },
  { color: '#006EBD', value: '006EBD', 'aria-label': 'blue' },
  { color: '#011F5E', value: '011F5E', 'aria-label': 'dark blue' },
  { color: '#712F9E', value: '712F9E', 'aria-label': 'purple' },
];

export const SwatchPickerSpacing = () => {
  const styles = useStyles();

  return (
    <div className={styles.example}>
      <SwatchPicker aria-label="SwatchPicker medium spacing">
        {colors.map((color, index) => {
          return <ColorSwatch key={`${color.value}-${index}`} {...color} />;
        })}
      </SwatchPicker>
      <SwatchPicker aria-label="SwatchPicker small spacing" spacing="small">
        {colors.map((color, index) => {
          return <ColorSwatch key={`${color.value}-${index}`} {...color} />;
        })}
      </SwatchPicker>
    </div>
  );
};
