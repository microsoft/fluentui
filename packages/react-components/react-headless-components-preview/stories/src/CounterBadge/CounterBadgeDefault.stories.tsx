import * as React from 'react';
import { CounterBadge } from '@fluentui/react-headless-components-preview/badge';

import styles from './counter-badge.module.css';

export const Default = (): React.ReactNode => (
  <div className={styles.demo}>
    <CounterBadge className={styles.counterBadge} count={4} aria-label="4 notifications" />
    <CounterBadge className={styles.counterBadge} count={100} aria-label="More than 99 notifications" />
    <CounterBadge className={styles.counterBadge} count={0} showZero aria-label="No notifications" />
    <CounterBadge className={styles.counterBadge} dot aria-label="New activity" />
    <CounterBadge className={styles.counterBadge} count={0} aria-label="Hidden empty counter" />
  </div>
);
