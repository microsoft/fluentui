import * as React from 'react';
import { DismissRegular, ImageRegular, LightbulbRegular } from '@fluentui/react-icons';
import {
  TeachingPopover,
  TeachingPopoverBody,
  TeachingPopoverFooter,
  TeachingPopoverHeader,
  TeachingPopoverSurface,
  TeachingPopoverTitle,
  TeachingPopoverTrigger,
} from '@fluentui/react-headless-components-preview/teaching-popover';

import styles from './teaching-popover.module.css';
import popoverStyles from '../Popover/popover.module.css';

export const Default = (): React.ReactNode => (
  <TeachingPopover positioning={{ offset: 10 }}>
    <TeachingPopoverTrigger>
      <button className={popoverStyles.trigger}>TeachingPopover trigger</button>
    </TeachingPopoverTrigger>
    <TeachingPopoverSurface className={`${popoverStyles.surfaceWithArrow} ${styles.surface}`}>
      <TeachingPopoverHeader
        className={styles.header}
        icon={{ className: styles.headerIcon, children: <LightbulbRegular /> }}
        dismissButton={{ className: styles.dismissButton, children: <DismissRegular /> }}
      >
        Tips
      </TeachingPopoverHeader>
      <TeachingPopoverBody className={styles.body} media={{ className: styles.media, children: <ImageRegular /> }}>
        <TeachingPopoverTitle className={styles.title}>Teaching Bubble Title</TeachingPopoverTitle>
        <p className={styles.bodyText}>This is a teaching popover body</p>
      </TeachingPopoverBody>
      <TeachingPopoverFooter className={styles.footer}>
        <button className={`${styles.actionButton} ${styles.actionButtonPrimary}`}>Learn more</button>
        <button className={styles.actionButton}>Got it</button>
      </TeachingPopoverFooter>
    </TeachingPopoverSurface>
  </TeachingPopover>
);
