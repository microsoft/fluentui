import * as React from 'react';
import { tinycolor } from '@ctrl/tinycolor';
import { ColorSlider, ColorSliderProps } from '@fluentui/react-color-picker-preview';
import { Button, makeStyles } from '@fluentui/react-components';

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

const DEFAULT_COLOR_HSV = tinycolor('#2be700').toHsv();

export const ColorSliderExample = (props: Partial<ColorSliderProps>) => {
  const styles = useStyles();
  const [color, setColor] = React.useState(DEFAULT_COLOR_HSV);
  const onSliderChange: ColorSliderProps['onChange'] = (_, data) => setColor({ ...data.color, a: data.color.a ?? 1 });
  const resetSlider = () => setColor(DEFAULT_COLOR_HSV);

  return (
    <div className={styles.example}>
      <ColorSlider color={color} onChange={onSliderChange} {...props} />
      <ColorSlider color={color} onChange={onSliderChange} vertical {...props} />
      <div className={styles.previewColor} style={{ backgroundColor: tinycolor(color).toHexString() }} />
      <Button onClick={resetSlider}>Reset</Button>
    </div>
  );
};

ColorSliderExample.parameters = {
  docs: {
    description: {
      story: 'The `ColorSlider` allows users to change the hue aspect of a color value.',
    },
  },
};
