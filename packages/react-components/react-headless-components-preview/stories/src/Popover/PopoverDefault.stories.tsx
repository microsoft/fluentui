import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';

import styles from './popover.module.css';

export const Default = (): React.ReactNode => (
  <Popover>
    <PopoverTrigger>
      <button className={styles.trigger}>Show popover</button>
    </PopoverTrigger>
    <PopoverSurface className={styles.surface}>
      <h3 className={styles.heading}>Popover title</h3>
      <p className={styles.body}>
        This is the content of the popover. Click the trigger again or press Escape to close.
      </p>
    </PopoverSurface>
  </Popover>
);
