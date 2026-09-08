import * as React from 'react';
import { ColorArea } from '@fluentui/react-headless-components-preview/color-picker';
import { type HSVA, tinycolor } from '@ctrl/tinycolor';

import styles from './color-picker.module.css';

export const ColorAreaDefault = (): React.ReactElement => {
  const [color, setColor] = React.useState({ h: 320, s: 0.7, v: 0.8, a: 0.75 });

  return (
    <div className={styles.card}>
      <ColorArea
        aria-label="Saturation and value"
        className={styles.area}
        color={color}
        onChange={(_, data) => setColor({ a: 1, ...data.color })}
        inputX={{ 'aria-label': 'Saturation', className: styles.areaInput }}
        inputY={{ 'aria-label': 'Value', className: styles.areaInput }}
        thumb={{ className: styles.areaThumb }}
      />

      <ColorPreview color={color} />
    </div>
  );
};

ColorAreaDefault.storyName = 'ColorArea';
ColorAreaDefault.parameters = {
  docs: {
    description: {
      story:
        'A color area component that allows users to select the saturation and value of a color. The area displays a gradient representing the range of saturation and value, and the thumb can be moved within the area to adjust these values.',
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
