import * as React from 'react';
import { Slider, ThemeProvider } from '@fluentui/react-windmod-preview';

import styles from '../compare.module.css';

const sizes = ['small', 'medium'] as const;
const values = [0, 25, 50, 75, 100] as const;
const steps = [10, 25, 50] as const;

export const Default = (): React.ReactNode => (
  <ThemeProvider>
    <div className={styles.stack}>
      <div className={styles.row}>
        {sizes.map(size => (
          <Slider key={size} size={size} defaultValue={50} />
        ))}
      </div>
      <div className={styles.row}>
        {values.map(value => (
          <Slider key={value} value={value} />
        ))}
      </div>
      <div className={styles.row}>
        {steps.map(step => (
          <Slider key={step} step={step} defaultValue={40} />
        ))}
      </div>
      <div className={styles.row}>
        <Slider min={-50} max={50} defaultValue={-25} />
        <Slider min={0} max={10} step={2} defaultValue={6} />
      </div>
      <div className={styles.row}>
        {sizes.map(size => (
          <Slider key={size} disabled size={size} defaultValue={50} />
        ))}
      </div>
      <div className={styles.row}>
        {sizes.map(size => (
          <Slider key={size} vertical size={size} defaultValue={75} />
        ))}
        <Slider vertical step={20} defaultValue={40} />
        <Slider vertical disabled defaultValue={60} />
      </div>
    </div>
  </ThemeProvider>
);
