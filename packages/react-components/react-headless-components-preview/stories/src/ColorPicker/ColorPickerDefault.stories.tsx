import * as React from 'react';
import {
  AlphaSlider,
  ColorArea,
  ColorPicker,
  ColorSlider,
} from '@fluentui/react-headless-components-preview/color-picker';
import { type HSVA, tinycolor } from '@ctrl/tinycolor';

import styles from './color-picker.module.css';

export const ColorPickerDefault = (): React.ReactNode => {
  const [color, setColor] = React.useState({ h: 320, s: 0.7, v: 0.8, a: 0.75 });

  return (
    <section className={styles.card}>
      <ColorPicker
        aria-label="Color controls"
        color={color}
        onColorChange={(_, data) => setColor({ a: 1, ...data.color })}
      >
        <ColorArea
          aria-label="Saturation and value"
          className={styles.area}
          inputX={{ 'aria-label': 'Saturation', className: styles.areaInput }}
          inputY={{ 'aria-label': 'Value', className: styles.areaInput }}
          thumb={{ className: styles.areaThumb }}
        />
        <ColorSlider
          aria-label="Hue"
          channel="hue"
          className={styles.slider}
          input={{ className: styles.sliderInput }}
          rail={{ className: styles.rail }}
          thumb={{ className: styles.thumb }}
        />
        <AlphaSlider
          aria-label="Opacity"
          className={`${styles.slider} ${styles.alphaSlider}`}
          input={{ className: styles.sliderInput }}
          rail={{ className: styles.rail }}
          thumb={{ className: styles.thumb }}
        />
      </ColorPicker>
      <ColorPreview color={color} />
    </section>
  );
};

ColorPickerDefault.storyName = 'ColorPicker';
ColorPickerDefault.parameters = {
  docs: {
    description: {
      story:
        'A color picker component that allows users to select a color using a color area, color sliders, and an alpha slider.',
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
