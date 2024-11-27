import * as React from 'react';
import { tinycolor } from '@ctrl/tinycolor';
import { makeStyles } from '@fluentui/react-components';
import {
  ColorPicker,
  ColorSlider,
  AlphaSlider,
  ColorPickerProps,
  ColorArea,
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

const DEFAULT_COLOR_HSV = tinycolor('#2be700').toHsv();

export const Default = () => {
  const styles = useStyles();
  const [color, setColor] = React.useState(DEFAULT_COLOR_HSV);
  const handleChange: ColorPickerProps['onColorChange'] = (_, data) =>
    setColor({ ...data.color, a: data.color.a ?? 1 });

  return (
    <div className={styles.example}>
      <ColorPicker color={color} onColorChange={handleChange}>
        <ColorSlider />
        <AlphaSlider />
        <ColorArea />
      </ColorPicker>

      <div className={styles.previewColor} style={{ backgroundColor: tinycolor(color).toRgbString() }} />
    </div>
  );
};
