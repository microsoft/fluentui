import * as React from 'react';

import { Input } from '@fluentui/react-components';

import styles from './SlotSketch.module.css';

export const SlotSketch = () => {
  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <div className={styles.component}>
          <div className={`${styles.slot} ${styles.contentSlot}`}>Before</div>
          <div className={styles.inputSketch}>Placeholder text</div>
          <div className={`${styles.slot} ${styles.contentSlot}`}>After</div>
        </div>
      </div>
      <div className={styles.card}>
        <Input
          className={styles.input}
          contentBefore={<div className={styles.urlBefore}>www.</div>}
          contentAfter={<div className={styles.urlAfter}>.com</div>}
          placeholder="domain name here"
        />
      </div>
    </div>
  );
};
