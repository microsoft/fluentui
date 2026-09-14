import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';

import styles from './popover.module.css';

export const OpenOnContext = (): React.ReactNode => (
  <Popover openOnContext>
    <PopoverTrigger>
      <div className={styles.contextTrigger}>Right-click this area</div>
    </PopoverTrigger>
    <PopoverSurface className={`${styles.surface} ${styles.surfaceMenu}`}>
      <button className={styles.menuItem}>Cut</button>
      <button className={styles.menuItem}>Copy</button>
      <button className={styles.menuItem}>Paste</button>
    </PopoverSurface>
  </Popover>
);
