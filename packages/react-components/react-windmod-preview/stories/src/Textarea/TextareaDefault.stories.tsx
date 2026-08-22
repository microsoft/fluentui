import * as React from 'react';
import { Textarea, ThemeProvider } from '@fluentui/react-windmod-preview';

import styles from '../compare.module.css';

const appearances = ['outline', 'filled-darker', 'filled-lighter'] as const;
const sizes = ['small', 'medium', 'large'] as const;
const resizes = ['none', 'horizontal', 'vertical', 'both'] as const;

export const Default = (): React.ReactNode => (
  <ThemeProvider>
    <div className={styles.stack}>
      <div className={styles.row}>
        {appearances.map(appearance => (
          <Textarea key={appearance} appearance={appearance} defaultValue={appearance} />
        ))}
      </div>
      <div className={styles.row}>
        {sizes.map(size => (
          <Textarea key={size} size={size} defaultValue={size} />
        ))}
      </div>
      <div className={styles.row}>
        {resizes.map(resize => (
          <Textarea key={resize} resize={resize} defaultValue={resize} />
        ))}
      </div>
      <div className={styles.row}>
        {sizes.map(size => (
          <Textarea key={size} size={size} placeholder={`Placeholder ${size}`} />
        ))}
      </div>
      <div className={styles.row}>
        {appearances.map(appearance => (
          <Textarea key={appearance} appearance={appearance} aria-invalid defaultValue="Invalid" />
        ))}
      </div>
      <div className={styles.row}>
        {appearances.map(appearance => (
          <Textarea key={appearance} appearance={appearance} disabled defaultValue="Disabled" />
        ))}
      </div>
    </div>
  </ThemeProvider>
);
