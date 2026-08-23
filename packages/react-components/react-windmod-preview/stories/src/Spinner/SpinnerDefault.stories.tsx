import * as React from 'react';
import { FluentProvider, Spinner } from '@fluentui/react-windmod-preview';

import styles from '../compare.module.css';

const sizes = ['extra-tiny', 'tiny', 'extra-small', 'small', 'medium', 'large', 'extra-large', 'huge'] as const;
const labelPositions = ['above', 'below', 'before', 'after'] as const;

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      <div className={styles.row}>
        {sizes.map(size => (
          <Spinner key={size} size={size} />
        ))}
      </div>
      <div className={styles.row}>
        {labelPositions.map(labelPosition => (
          <Spinner key={labelPosition} label={labelPosition} labelPosition={labelPosition} />
        ))}
      </div>
      {/* Every inverted value is white or near-white — only a dark ground shows it. */}
      <div className={styles.row} style={{ background: '#333333', padding: 12 }}>
        {sizes.map(size => (
          <Spinner key={size} appearance="inverted" size={size} label="Loading" />
        ))}
      </div>
    </div>
  </FluentProvider>
);
