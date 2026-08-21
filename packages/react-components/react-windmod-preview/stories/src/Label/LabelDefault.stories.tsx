import * as React from 'react';
import { Label, ThemeProvider } from '@fluentui/react-windmod-preview';

import styles from '../compare.module.css';

const sizes = ['small', 'medium', 'large'] as const;
const weights = ['regular', 'semibold'] as const;

export const Default = (): React.ReactNode => (
  <ThemeProvider>
    <div className={styles.stack}>
      {sizes.map(size =>
        weights.map(weight => (
          <div key={`${size}-${weight}`} className={styles.row}>
            <Label size={size} weight={weight}>
              {size} {weight}
            </Label>
            <Label size={size} weight={weight} required>
              Required
            </Label>
            <Label size={size} weight={weight} required="(required)">
              Custom indicator
            </Label>
            <Label size={size} weight={weight} disabled>
              Disabled
            </Label>
            <Label size={size} weight={weight} disabled required>
              Disabled required
            </Label>
          </div>
        )),
      )}
    </div>
  </ThemeProvider>
);
