import * as React from 'react';
import { CounterBadge } from '@fluentui/react-headless-components-preview/badge';

import styles from './counter-badge.module.css';

export const Default = (): React.ReactNode => (
  <div className={styles.demo}>
    <button type="button" className={styles.notificationButton} aria-label="4 notifications">
      <CounterBadge className={styles.counterBadge} count={4} aria-hidden />
    </button>
    <button type="button" className={styles.notificationButton} aria-label="More than 99 notifications">
      <CounterBadge className={styles.counterBadge} count={100} aria-hidden />
    </button>
    <button type="button" className={styles.notificationButton} aria-label="No notifications">
      <CounterBadge className={styles.counterBadge} count={0} showZero aria-hidden />
    </button>
    <button type="button" className={styles.notificationButton} aria-label="New activity">
      <CounterBadge className={styles.counterBadge} dot aria-hidden />
    </button>
    <button type="button" className={styles.notificationButton} aria-label="No new notifications">
      <CounterBadge className={styles.counterBadge} count={0} aria-hidden />
    </button>
  </div>
);
