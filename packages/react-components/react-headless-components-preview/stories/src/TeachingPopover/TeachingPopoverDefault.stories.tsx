import * as React from 'react';
import {
  TeachingPopover,
  TeachingPopoverTrigger,
  TeachingPopoverSurface,
  TeachingPopoverHeader,
  TeachingPopoverTitle,
  TeachingPopoverBody,
  TeachingPopoverFooter,
} from '@fluentui/react-headless-components-preview/teaching-popover';

import styles from './teaching-popover.module.css';

export const Default = (): React.ReactNode => (
  <TeachingPopover>
    <TeachingPopoverTrigger>
      <button className={styles.trigger}>Show teaching popover</button>
    </TeachingPopoverTrigger>
    <TeachingPopoverSurface className={styles.surface}>
      <TeachingPopoverHeader className={styles.header}>
        <span aria-hidden>💡</span>
        <span className={styles.headerSpacer} />
        <button className={styles.iconButton}>×</button>
      </TeachingPopoverHeader>
      <TeachingPopoverTitle className={styles.title}>Did you know?</TeachingPopoverTitle>
      <TeachingPopoverBody className={styles.body}>
        Teaching popovers are great for quick contextual learning moments — keep them short.
      </TeachingPopoverBody>
      <TeachingPopoverFooter className={styles.footer}>
        <button className={`${styles.actionButton} ${styles.actionButtonPrimary}`}>Got it</button>
      </TeachingPopoverFooter>
    </TeachingPopoverSurface>
  </TeachingPopover>
);
