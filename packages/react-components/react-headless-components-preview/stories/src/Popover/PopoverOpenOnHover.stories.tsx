import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';

import styles from './popover.module.css';

export const OpenOnHover = (): React.ReactNode => (
  <Popover openOnHover>
    <PopoverTrigger>
      <button className={styles.trigger}>Hover me</button>
    </PopoverTrigger>
    <PopoverSurface className={styles.surface}>
      <h3 className={styles.heading}>Hover popover</h3>
      <p className={styles.body}>
        This popover opens when you hover over the trigger and closes when the mouse leaves both the trigger and the
        surface.
      </p>
    </PopoverSurface>
  </Popover>
);
