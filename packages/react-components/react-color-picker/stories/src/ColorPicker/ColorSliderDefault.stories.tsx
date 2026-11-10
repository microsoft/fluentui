import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { tinycolor } from '@ctrl/tinycolor';
import { ColorSlider, type ColorSliderProps, Button, makeStyles } from '@fluentui/react-components';

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
const DEFAULT_COLOR_HSV = { h: 109, s: 1, v: 0.9, a: 1 };

export const ColorSliderDefault = (props: Partial<ColorSliderProps>): JSXElement => {
  const styles = useStyles();
  const [color, setColor] = React.useState(DEFAULT_COLOR_HSV);
  const [hue, setHue] = React.useState(DEFAULT_COLOR_HSV.h);
  const [namedColor, setNamedColor] = React.useState('');
  const onSliderChange: ColorSliderProps['onChange'] = (_, data) => {
    setColor({ ...data.color, a: data.color.a ?? 1 });
    setHue(data.color.h);
    const _namedColor = tinycolor(`hsl(${data.color.h},100%,50%)`).toName();
    if (_namedColor) {
      setNamedColor(_namedColor);
    }
  };
  const resetSlider = () => setColor(DEFAULT_COLOR_HSV);

  return (
    <div className={styles.example}>
      <ColorSlider
        color={color}
        onChange={onSliderChange}
        aria-label="Hue"
        aria-valuetext={`${hue}°, ${namedColor}`}
        {...props}
      />
      <ColorSlider
        color={color}
        onChange={onSliderChange}
        vertical
        aria-label="Vertical Hue"
        aria-valuetext={`${hue}°, ${namedColor}`}
        {...props}
      />
      <div className={styles.previewColor} style={{ backgroundColor: tinycolor(color).toHexString() }} />
      <Button onClick={resetSlider}>Reset</Button>
    </div>
  );
};

ColorSliderDefault.parameters = {
  docs: {
    description: {
      story: 'The `ColorSlider` allows users to change the hue aspect of a color value.',
    },
  },
};
