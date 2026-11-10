import * as React from 'react';
import { Divider } from '@fluentui/react-headless-components-preview/divider';

import styles from './divider.module.css';
export const Default = (): React.ReactNode => (
  <div className={styles.column}>
    <p className={styles.section}>Content above</p>
    <Divider className={styles.divider}>
      <span className={styles.label}>Or</span>
    </Divider>
    <p className={styles.section}>Content below</p>

    <Divider className={`${styles.divider} ${styles.start}`}>
      <span className={styles.label}>Section</span>
    </Divider>

    <Divider className={`${styles.divider} ${styles.end}`}>
      <span className={styles.label}>End</span>
    </Divider>

    <Divider className={styles.horizontal} />
  </div>
);
