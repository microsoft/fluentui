import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';

import styles from './popover.module.css';

export const OpenOnHover = (): React.ReactNode => (
  <>
    <Popover openOnHover>
      <PopoverTrigger>
        <button className={styles.trigger}>Hover me</button>
      </PopoverTrigger>
      <PopoverSurface className={styles.surface}>
        <h3 className={styles.heading}>Hover popover</h3>
        <p className={styles.body}>
          Keep the pointer over this surface, focus the button below, then press Tab. The popover stays open while
          hovered; moving the pointer away closes it without moving keyboard focus.
        </p>
        <button className={styles.trigger}>Inside hover popover</button>
      </PopoverSurface>
    </Popover>
    <button className={styles.trigger}>After hover popover</button>
  </>
);
