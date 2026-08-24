import * as React from 'react';
import { FluentProvider, SpinButton } from '@fluentui/react-windmod-preview';

import styles from '../compare.module.css';

const appearances = ['outline', 'underline', 'filled-darker', 'filled-lighter'] as const;
const sizes = ['small', 'medium'] as const;

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      <div className={styles.row}>
        {appearances.map(appearance => (
          <SpinButton key={appearance} appearance={appearance} defaultValue={5} />
        ))}
      </div>
      <div className={styles.row}>
        {sizes.map(size => (
          <SpinButton key={size} size={size} defaultValue={5} />
        ))}
      </div>
      <div className={styles.row}>
        <SpinButton value={0} min={0} max={10} onChange={() => undefined} />
        <SpinButton value={10} min={0} max={10} onChange={() => undefined} />
        <SpinButton value={3} min={3} max={3} onChange={() => undefined} />
      </div>
      <div className={styles.row}>
        {sizes.map(size => (
          <SpinButton key={size} size={size} value={1} displayValue="$1.00" onChange={() => undefined} />
        ))}
      </div>
      <div className={styles.row}>
        {sizes.map(size => (
          <SpinButton key={size} size={size} defaultValue={null} placeholder={`Placeholder ${size}`} />
        ))}
      </div>
      <div className={styles.row}>
        {appearances.map(appearance => (
          <SpinButton key={appearance} appearance={appearance} disabled defaultValue={5} />
        ))}
      </div>
      <div className={styles.row}>
        {appearances.map(appearance => (
          <SpinButton key={appearance} appearance={appearance} readOnly defaultValue={5} />
        ))}
      </div>
      <div className={styles.row}>
        {appearances.map(appearance => (
          <SpinButton key={appearance} appearance={appearance} aria-invalid defaultValue={5} />
        ))}
      </div>
    </div>
  </FluentProvider>
);
