import * as React from 'react';
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

export const Default = () => {
  const styles = useStyles();
  const defaultColor = '#2be700';
  const [color, setColor] = React.useState(defaultColor);
  const handleChange: ColorPickerProps['onColorChange'] = (_, data) => setColor(data.color);

  return (
    <div className={styles.example}>
      <ColorPicker color={color} onColorChange={handleChange}>
        <ColorSlider max={360} />
        <AlphaSlider />
        <ColorArea />
      </ColorPicker>

      <div className={styles.previewColor} style={{ backgroundColor: color }} />
    </div>
  );
};
