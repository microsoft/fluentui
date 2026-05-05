import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';
import type { JSXElement } from '@fluentui/react-components';

import descriptionMd from './PopoverNestedDescription.md';
import styles from './popover.module.css';

const SecondNestedPopover = (): JSXElement => (
  <Popover>
    <PopoverTrigger>
      <button className={`${styles.trigger} ${styles.triggerSmall}`}>Second nested trigger</button>
    </PopoverTrigger>
    <PopoverSurface className={`${styles.surface} ${styles.surfaceColumnLg}`}>
      <h3 className={styles.headingFlush}>Popover content</h3>
      <div className={styles.body}>This is some popover content.</div>
      <button className={styles.actionButton}>Second nested button</button>
    </PopoverSurface>
  </Popover>
);

const FirstNestedPopover = (): JSXElement => (
  <Popover>
    <PopoverTrigger>
      <button className={`${styles.trigger} ${styles.triggerSecondary} ${styles.triggerSmall}`}>
        First nested trigger
      </button>
    </PopoverTrigger>
    <PopoverSurface className={`${styles.surface} ${styles.surfaceColumnLg}`}>
      <h3 className={styles.headingFlush}>Popover content</h3>
      <div className={styles.body}>This is some popover content.</div>
      <button className={styles.actionButton}>First nested button</button>
      <div className={styles.row}>
        <SecondNestedPopover />
      </div>
    </PopoverSurface>
  </Popover>
);

export const Nested = (): React.ReactNode => (
  <Popover>
    <PopoverTrigger>
      <button className={styles.trigger}>Root trigger</button>
    </PopoverTrigger>
    <PopoverSurface className={`${styles.surface} ${styles.surfaceColumnLg}`}>
      <h3 className={styles.headingFlush}>Popover content</h3>
      <div className={styles.body}>This is some popover content.</div>
      <div className={styles.row}>
        <button className={styles.actionButton}>Root button</button>
        <FirstNestedPopover />
      </div>
    </PopoverSurface>
  </Popover>
);

Nested.parameters = {
  docs: {
    description: {
      story: descriptionMd,
    },
  },
};
