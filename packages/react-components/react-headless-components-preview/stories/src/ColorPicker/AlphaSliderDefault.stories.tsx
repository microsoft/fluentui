import * as React from 'react';
import { AlphaSlider } from '@fluentui/react-headless-components-preview/color-picker';
import { type HSVA, tinycolor } from '@ctrl/tinycolor';

import styles from './color-picker.module.css';

export const AlphaSliderDefault = (): React.ReactNode => {
  const [color, setColor] = React.useState({ h: 320, s: 0.7, v: 0.8, a: 0.75 });

  return (
    <div className={styles.card}>
      <AlphaSlider
        aria-label="Opacity"
        aria-valuetext={`${Math.round((color.a ?? 1) * 100)}%`}
        className={`${styles.slider} ${styles.alphaSlider}`}
        color={color}
        onChange={(_, data) => setColor({ a: 1, ...data.color })}
        input={{ className: styles.sliderInput }}
        rail={{ className: styles.rail }}
        thumb={{ className: styles.thumb }}
      />

      <ColorPreview color={color} />
    </div>
  );
};

AlphaSliderDefault.storyName = 'AlphaSlider';
AlphaSliderDefault.parameters = {
  docs: {
    description: {
      story:
        'An alpha slider component that allows users to select the opacity of a color. The slider displays a gradient from fully transparent to fully opaque, and the thumb can be moved along the slider to adjust the opacity value.',
    },
  },
};

const ColorPreview = ({ color }: { color: HSVA }): React.ReactNode => {
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
