import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { tinycolor } from '@ctrl/tinycolor';
import { ColorSlider, type ColorSliderProps, Button } from '@fluentui/react-components';

import styles from './ColorSliderChannels.module.css';

const DEFAULT_COLOR_HSV = tinycolor('#2be700').toHsv();

export const ColorSliderChannels = (): JSXElement => {
  const [color, setColor] = React.useState(DEFAULT_COLOR_HSV);

  const onSliderChange: ColorSliderProps['onChange'] = (_, data) => {
    setColor({ ...data.color, a: data.color.a ?? 1 });
  };

  const resetSlider = () => setColor(DEFAULT_COLOR_HSV);

  return (
    <div className={styles.example}>
      <h4>Hue</h4>
      <ColorSlider color={color} onChange={onSliderChange} />
      <h4>Saturation</h4>
      <ColorSlider color={color} channel="saturation" onChange={onSliderChange} />
      <h4>Value (Brightness)</h4>
      <ColorSlider color={color} channel="value" onChange={onSliderChange} />
      <div className={styles.previewColor} style={{ backgroundColor: tinycolor(color).toHexString() }} />
      <Button onClick={resetSlider}>Reset</Button>
    </div>
  );
};

ColorSliderChannels.parameters = {
  docs: {
    description: {
      story: 'The `ColorSlider` allows users to choose color channels like hue, saturation, and value.',
    },
  },
};
