import * as React from 'react';
import { makeStyles } from '@griffel/react';
import {
  ColorPicker,
  ColorPickerProps,
  ColorArea,
  ColorSliderProps,
  ColorSlider,
} from '@fluentui/react-color-picker-preview';

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

export const Default = (props: Partial<ColorPickerProps>) => {
  const styles = useStyles();
  const [hueSliderValue, setHueSliderValue] = React.useState(160);
  const [alphaSliderValue, setAlphaSliderValue] = React.useState(100);
  const onSliderChange: ColorSliderProps['onChange'] = (_, data) => setHueSliderValue(data.value);
  const onAlphaSliderChange: ColorSliderProps['onChange'] = (_, data) => setAlphaSliderValue(data.value);
  return (
    <div className={styles.example}>
      <ColorPicker {...props}>
        <ColorArea />
        <ColorSlider value={hueSliderValue} max={360} onChange={onSliderChange} {...props} />
        <ColorSlider
          value={alphaSliderValue}
          color={`hsl(${hueSliderValue}, 100%, 50%)`}
          variant="alpha"
          max={100}
          onChange={onAlphaSliderChange}
          {...props}
        />
      </ColorPicker>
      <div
        className={styles.previewColor}
        style={{ backgroundColor: `hsla(${hueSliderValue}, 100%, 50%, ${alphaSliderValue / 100})` }}
      />
    </div>
  );
};
