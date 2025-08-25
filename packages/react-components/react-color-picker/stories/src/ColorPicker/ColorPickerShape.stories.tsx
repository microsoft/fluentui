import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { tinycolor } from '@ctrl/tinycolor';
import { makeStyles, ColorPicker, ColorSlider, AlphaSlider, ColorArea } from '@fluentui/react-components';
import type { ColorPickerProps } from '@fluentui/react-components';

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
    '@media (forced-colors: active)': {
      forcedColorAdjust: 'none',
    },
  },
});

const DEFAULT_COLOR_HSV = { h: 109, s: 1, v: 0.91, a: 1 };

export const ColorPickerShape = (): JSXElement => {
  const styles = useStyles();
  const [color, setColor] = React.useState(DEFAULT_COLOR_HSV);
  const handleChange: ColorPickerProps['onColorChange'] = (_, data) =>
    setColor({ ...data.color, a: data.color.a ?? 1 });

  return (
    <div className={styles.example}>
      <h3>Rounded (default)</h3>
      <ColorPicker color={color} onColorChange={handleChange}>
        <ColorSlider aria-label="Hue" />
        <AlphaSlider aria-label="Alpha" />
        <ColorArea inputX={{ 'aria-label': 'Saturation' }} inputY={{ 'aria-label': 'Brightness' }} />
      </ColorPicker>
      <h3>Square (default)</h3>
      <ColorPicker shape="square" color={color} onColorChange={handleChange}>
        <ColorArea />
        <ColorSlider />
        <AlphaSlider />
      </ColorPicker>
      <div className={styles.previewColor} style={{ backgroundColor: tinycolor(color).toRgbString() }} />
    </div>
  );
};

ColorPickerShape.parameters = {
  docs: {
    description: {
      story: 'The `shape` prop sets border-radius of the ColorPicker sub-components. The default is `rounded`.',
    },
  },
};
