import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';

import styles from './positioning.module.css';

export const Offset = (): React.ReactNode => {
  const [mainAxis, setMainAxis] = React.useState(10);
  const [crossAxis, setCrossAxis] = React.useState(0);

  return (
    <div className={styles.outer}>
      <div className={styles.column}>
        <label className={styles.row}>
          <code>mainAxis</code>
          <input
            type="number"
            className={styles.input}
            value={mainAxis}
            onChange={e => setMainAxis(parseInt(e.target.value, 10) || 0)}
          />
        </label>
        <label className={styles.row}>
          <code>crossAxis</code>
          <input
            type="number"
            className={styles.input}
            value={crossAxis}
            onChange={e => setCrossAxis(parseInt(e.target.value, 10) || 0)}
          />
        </label>

        <div className={styles.group}>
          <span className={styles.fieldLabel}>offset: number (mainAxis only)</span>
          <Popover positioning={{ position: 'after', offset: mainAxis }}>
            <PopoverTrigger>
              <button className={styles.trigger}>Number offset</button>
            </PopoverTrigger>
            <PopoverSurface className={styles.surfaceCallout}>Container</PopoverSurface>
          </Popover>
        </div>

        <div className={styles.group}>
          <span className={styles.fieldLabel}>offset: {'{ mainAxis, crossAxis }'}</span>
          <Popover positioning={{ position: 'after', offset: { mainAxis, crossAxis } }}>
            <PopoverTrigger>
              <button className={styles.trigger}>Object offset</button>
            </PopoverTrigger>
            <PopoverSurface className={styles.surfaceCallout}>Container</PopoverSurface>
          </Popover>
        </div>
      </div>
    </div>
  );
};
