import * as React from 'react';
import { FluentProvider, Rating } from '@fluentui/react-windmod-preview';

import styles from '../compare.module.css';

const colors = ['neutral', 'brand', 'marigold'] as const;
const sizes = ['small', 'medium', 'large', 'extra-large'] as const;

export const Default = (): React.ReactNode => {
  const [value, setValue] = React.useState(3);

  return (
    <FluentProvider>
      <div className={styles.stack}>
        <div className={styles.row}>
          {sizes.map(size => (
            <Rating key={size} size={size} defaultValue={3} />
          ))}
        </div>
        <div className={styles.row}>
          {colors.map(color => (
            <Rating key={color} color={color} size="medium" defaultValue={3} />
          ))}
        </div>
        <div className={styles.row}>
          <Rating step={0.5} size="medium" defaultValue={2.5} />
          <Rating step={0.5} size="medium" color="brand" defaultValue={3.5} />
        </div>
        <div className={styles.row}>
          {[1, 3, 7, 10].map(max => (
            <Rating key={max} max={max} size="medium" defaultValue={1} />
          ))}
        </div>
        <div className={styles.row}>
          <Rating size="medium" value={value} onChange={(_, data) => setValue(data.value)} />
          <span className={styles.label}>value: {value}</span>
        </div>
        <div className={styles.row}>
          <Rating size="medium" defaultValue={4} />
        </div>
      </div>
    </FluentProvider>
  );
};
