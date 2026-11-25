import * as React from 'react';
import { ColorSlider } from '@fluentui/react-headless-components-preview/color-picker';
import { type HSVA, tinycolor } from '@ctrl/tinycolor';

import styles from './color-picker.module.css';

export const ColorSliderDefault = (): React.ReactElement => {
  const [color, setColor] = React.useState({ h: 320, s: 0.7, v: 0.8, a: 0.75 });

  return (
    <div className={styles.card}>
      <ColorSlider
        aria-label="Horizontal hue slider"
        className={styles.slider}
        color={color}
        onChange={(_, data) => setColor({ a: 1, ...data.color })}
        input={{ className: styles.sliderInput }}
        rail={{ className: styles.rail }}
        thumb={{ className: styles.thumb }}
      />

      <ColorSlider
        aria-label="Vertical hue slider"
        className={styles.slider}
        color={color}
        onChange={(_, data) => setColor({ a: 1, ...data.color })}
        vertical
        input={{ className: styles.sliderInput }}
        rail={{ className: styles.rail }}
        thumb={{ className: styles.thumb }}
      />
      <ColorPreview color={color} />
    </div>
  );
};

ColorSliderDefault.storyName = 'ColorSlider';
ColorSliderDefault.parameters = {
  docs: {
    description: {
      story:
        'A color slider component that allows users to select a color channel (hue, saturation, or value) using a slider control, in horizontal or vertical orientation.',
    },
  },
};

const ColorPreview = ({ color }: { color: HSVA }): React.ReactElement => {
  return (
    <div className={styles.colorPreview}>
      <output className={styles.output}>{tinycolor(color).toHex8String()}</output>
      <svg
        className={styles.color}
        viewBox="0 0 100 100"
        role="img"
        aria-label={`Selected color ${tinycolor(color).toHex8String()}`}
      >
        <rect width="100" height="100" rx="12" fill={tinycolor(color).toHex8String()} />
      </svg>
    </div>
  );
};
