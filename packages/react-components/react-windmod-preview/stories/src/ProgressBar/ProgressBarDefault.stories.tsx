import * as React from 'react';
import { ProgressBar, ThemeProvider } from '@fluentui/react-windmod-preview';

import styles from '../compare.module.css';

const values = [0, 0.25, 0.5, 0.75, 1] as const;
const thicknesses = ['medium', 'large'] as const;
const shapes = ['rounded', 'square'] as const;
const colors = ['brand', 'success', 'warning', 'error'] as const;

const track: React.CSSProperties = { width: 200 };

export const Default = (): React.ReactNode => (
  <ThemeProvider>
    <div className={styles.stack}>
      <div className={styles.row}>
        {values.map(value => (
          <div key={value} style={track}>
            <ProgressBar value={value} />
          </div>
        ))}
      </div>
      <div className={styles.row}>
        {thicknesses.map(thickness =>
          shapes.map(shape => (
            <div key={`${thickness}-${shape}`} style={track}>
              <ProgressBar value={0.5} thickness={thickness} shape={shape} />
            </div>
          )),
        )}
      </div>
      <div className={styles.row}>
        {colors.map(color => (
          <div key={color} style={track}>
            <ProgressBar value={0.6} color={color} />
          </div>
        ))}
      </div>
      <div style={{ width: 240 }}>
        <ProgressBar thickness="large" />
      </div>
    </div>
  </ThemeProvider>
);
