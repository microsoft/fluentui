import * as React from 'react';
import { ProgressBar } from '@fluentui/react-headless-components-preview/progress-bar';

import styles from '../../../../../../bebop/components/progress-bar.module.css';
import storySource from './ProgressBarDefault.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';
export const Default = (): React.ReactNode => (
  <div className={styles.demo}>
    <div className={styles.row}>
      <div className={styles.label}>
        <span>Uploading</span>
        <strong>50%</strong>
      </div>
      <ProgressBar className={styles.bar} bar={{ className: styles.fill }} value={0.5} />
    </div>

    <div className={styles.row}>
      <div className={styles.label}>
        <span>Backup complete</span>
        <strong>100%</strong>
      </div>
      <ProgressBar className={`${styles.bar} ${styles.success}`} bar={{ className: styles.fill }} value={1} />
    </div>

    <div className={styles.row}>
      <div className={styles.label}>
        <span>Indeterminate</span>
      </div>
      <ProgressBar className={`${styles.bar} ${styles.indeterminate}`} bar={{ className: styles.fill }} />
    </div>
  </div>
);

Default.parameters = withStorySource(storySource);
