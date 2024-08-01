import * as React from 'react';
import { makeStyles } from '@griffel/react';
import {
  ColorPicker,
  ColorArea,
  ColorSliderProps,
  ColorSlider,
  ColorPickerOnSelectEventHandler,
} from '@fluentui/react-color-picker-preview';
import { tinycolor } from '@ctrl/tinycolor';

const useStyles = makeStyles({
  example: {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  previewColor: {
    width: '50px',
    height: '50px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
});

export const ColorPickerGeneral = () => {
  const styles = useStyles();
  const COLOR = '#00ffaa';
  const [selectedColor, setSelectedColor] = React.useState(COLOR);
  const [sliderValue, setSliderValue] = React.useState(160);
  const [alpha, setAlpha] = React.useState(1);
  const hslColor = tinycolor(selectedColor).toHsl();

  const handleChange: ColorPickerOnSelectEventHandler = (_, data) => {
    setSliderValue(data.value);
    setSelectedColor(tinycolor({ h: sliderValue, s: hslColor.s, l: hslColor.l, a: alpha }).toHex());
  };

  return (
    <div className={styles.example}>
      <ColorPicker color={selectedColor} onChange={handleChange}>
        <ColorSlider channel="alpha" />
        <ColorSlider max={360} />
      </ColorPicker>
      <div className={styles.previewColor} style={{ backgroundColor: `#${selectedColor}` }} />
    </div>
  );
};
