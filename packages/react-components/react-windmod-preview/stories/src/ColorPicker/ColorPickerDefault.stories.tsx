import * as React from 'react';
import { AlphaSlider, ColorArea, ColorPicker, ColorSlider, FluentProvider } from '@fluentui/react-windmod-preview';

import styles from '../compare.module.css';

type HsvColor = { h: number; s: number; v: number; a?: number };

const initial: HsvColor = { a: 1, h: 210, s: 0.6, v: 0.8 };
const channels = ['hue', 'saturation', 'value'] as const;
const shapes = ['rounded', 'square'] as const;

export const Default = (): React.ReactNode => {
  const [color, setColor] = React.useState<HsvColor>(initial);

  return (
    <FluentProvider>
      <div className={styles.stack}>
        <ColorPicker color={color} onColorChange={(_, data) => setColor({ ...color, ...data.color })}>
          <ColorArea />
          <ColorSlider />
          <AlphaSlider />
        </ColorPicker>

        <div className={styles.row}>
          {channels.map(channel => (
            <ColorSlider key={channel} channel={channel} color={color} />
          ))}
        </div>

        <div className={styles.row}>
          {channels.map(channel => (
            <ColorSlider key={channel} channel={channel} color={color} vertical />
          ))}
        </div>

        <div className={styles.row}>
          {shapes.map(shape => (
            <ColorPicker key={shape} color={color} shape={shape}>
              <ColorArea />
              <ColorSlider />
            </ColorPicker>
          ))}
        </div>

        <div className={styles.row}>
          <AlphaSlider color={color} />
          <AlphaSlider color={color} transparency />
        </div>
      </div>
    </FluentProvider>
  );
};
