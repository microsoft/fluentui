import * as React from 'react';
import { makeStyles } from '@griffel/react';
import {
  ColorPicker,
  ColorArea,
  ColorSliderProps,
  AlphaSlider,
  HueSlider,
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

export const Default = () => {
  const styles = useStyles();
  const COLOR = 'rgba(0, 255, 170, 1)';
  const [selectedColor, setSelectedColor] = React.useState(COLOR);
  const [overlayColor, setOverlayColor] = React.useState(COLOR);
  const [alpha, setAlpha] = React.useState(100);
  const hslColor = tinycolor(selectedColor).toHsl();

  const [hueValue, setHueValue] = React.useState(160);

  const handleChange: ColorPickerOnSelectEventHandler = (_, data) => {
    data.alpha && setAlpha(data.alpha);
    data.hue && setHueValue(data.hue);
  };

  React.useEffect(() => {
    const newColor = tinycolor({ h: hueValue, s: hslColor.s, l: hslColor.l, a: alpha / 100 }).toRgbString();
    setSelectedColor(newColor);
    setOverlayColor(tinycolor({ h: hueValue, s: hslColor.s, l: hslColor.l }).toRgbString());
  }, [alpha, hueValue, overlayColor, hslColor]);

  return (
    <div className={styles.example}>
      <ColorPicker color={selectedColor} onChange={handleChange}>
        <AlphaSlider />
        <HueSlider max={360} value={hueValue} />
      </ColorPicker>
      <div className={styles.previewColor} style={{ backgroundColor: `${selectedColor}` }} />
    </div>
  );
};
