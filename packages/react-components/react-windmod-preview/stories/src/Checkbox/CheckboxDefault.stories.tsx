import * as React from 'react';
import { Checkbox, FluentProvider } from '@fluentui/react-windmod-preview';

import styles from '../compare.module.css';

const checkedValues = [false, true, 'mixed'] as const;
const shapes = ['square', 'circular'] as const;
const sizes = ['medium', 'large'] as const;
const positions = ['before', 'after'] as const;

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      <div className={styles.row}>
        {checkedValues.map(checked => (
          <Checkbox key={String(checked)} checked={checked} label="Hello" />
        ))}
      </div>
      <div className={styles.row}>
        {sizes.map(size => (
          <Checkbox key={size} defaultChecked size={size} label="Hello" />
        ))}
      </div>
      <div className={styles.row}>
        {shapes.map(shape =>
          checkedValues
            .filter(checked => checked !== false)
            .map(checked => (
              <Checkbox key={`${shape}-${String(checked)}`} checked={checked} shape={shape} label="Hello" />
            )),
        )}
      </div>
      <div className={styles.row}>
        {positions.map(labelPosition => (
          <Checkbox key={labelPosition} defaultChecked labelPosition={labelPosition} label="Hello" />
        ))}
      </div>
      <div className={styles.row}>
        {checkedValues.map(checked => (
          <Checkbox key={String(checked)} checked={checked} />
        ))}
      </div>
      <div className={styles.row}>
        {checkedValues.map(checked => (
          <Checkbox key={String(checked)} checked={checked} disabled label="Hello" />
        ))}
      </div>
    </div>
  </FluentProvider>
);
