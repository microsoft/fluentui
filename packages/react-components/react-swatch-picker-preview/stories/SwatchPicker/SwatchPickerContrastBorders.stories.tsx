import * as React from 'react';
import { makeStyles, shorthands } from '@fluentui/react-components';
import {
  SwatchPicker,
  ColorSwatch,
  SwatchPickerOnSelectEventHandler,
  getContrastRatio,
} from '@fluentui/react-swatch-picker-preview';

const useStyles = makeStyles({
  example: {
    width: '100px',
    height: '100px',
    ...shorthands.border('1px', 'solid', '#ccc'),
    ...shorthands.margin('20px', '0'),
    '@media (forced-colors: active)': {
      forcedColorAdjust: 'none',
    },
  },
});

const CONTRAST_BORDER_COLOR = '#707070';
const BACKGROUND_COLOR = '#FFFFFF';

const colors = [
  { color: '#ff0072', value: 'ff0072', 'aria-label': 'pink' },
  { color: '#ffbbf0', value: 'ffbbf0', 'aria-label': 'light pink' },
  { color: '#CCCCCC', value: 'CCCCCC', 'aria-label': 'light grey' },
  { color: '#a9e8ff', value: 'a9e8ff', 'aria-label': 'light blue' },
  { color: '#006EBD', value: '006EBD', 'aria-label': 'blue' },
  { color: '#712F9E', value: '712F9E', 'aria-label': 'purple' },
];

export const SwatchPickerContrastBorders = () => {
  const [selectedValue, setSelectedValue] = React.useState('ff0072');
  const [selectedColor, setSelectedColor] = React.useState('#ff0072');

  const handleSelect: SwatchPickerOnSelectEventHandler = (_, data) => {
    setSelectedValue(data.selectedValue);
    setSelectedColor(data.selectedSwatch);
  };

  const styles = useStyles();

  const el = document.querySelector('.fui-SwatchPicker');
  const wrapper = el?.parentElement;
  let bgColor = BACKGROUND_COLOR;
  if (wrapper) {
    const cssObj = window.getComputedStyle(wrapper, null);
    bgColor = cssObj.getPropertyValue('background-color');
  }

  return (
    <>
      <SwatchPicker aria-label="SwatchPicker default" selectedValue={selectedValue} onSelectionChange={handleSelect}>
        {colors.map(color => {
          const contrastRatio = getContrastRatio(color.color, bgColor);
          const borderContrastColor = contrastRatio && contrastRatio < 3 ? CONTRAST_BORDER_COLOR : '';
          return <ColorSwatch key={color.value} {...color} borderColor={borderContrastColor} />;
        })}
      </SwatchPicker>

      <div
        className={styles.example}
        style={{
          backgroundColor: selectedColor,
        }}
      />
    </>
  );
};

SwatchPickerContrastBorders.parameters = {
  docs: {
    description: {
      story: 'The `borderColor` prop is needed when contrast between a background and a swatch is low.',
    },
  },
};
