import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import {
  ColorPicker,
  ColorSlider,
  AlphaSlider,
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

  const [hue, setHue] = React.useState(160);
  const [alpha, setAlpha] = React.useState(50);
  const handleChange: ColorPickerOnSelectEventHandler = (_, data) => {
    if (data.value) {
      data.channel === 'hue' && setHue(data.value);
      data.channel === 'alpha' && setAlpha(data.value);
    }
  };

  return (
    <div className={styles.example}>
      <ColorPicker onColorChange={handleChange}>
        <ColorSlider value={hue} max={360} />
        <AlphaSlider overlayColor={`hsl(${hue}, 100%, 45%)`} value={alpha} />
      </ColorPicker>

      <div className={styles.previewColor} style={{ backgroundColor: `hsla(${hue}, 100%, 45%, ${alpha / 100})` }} />
    </div>
  );
};
