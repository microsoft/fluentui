import * as React from 'react';
import { Badge } from '@fluentui/react-headless-components-preview/badge';

import styles from '../../../../../../bebop/components/badge.module.css';
import storySource from './BadgeDefault.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';
export const Default = (): React.ReactNode => (
  <div className={styles.demo}>
    <Badge className={styles.badge}>Default</Badge>
    <Badge className={`${styles.badge} ${styles.solid}`}>Solid</Badge>
    <Badge className={`${styles.badge} ${styles.success}`}>
      <span className={styles.dot} />
      Success
    </Badge>
    <Badge className={`${styles.badge} ${styles.warning}`}>
      <span className={styles.dot} />
      Warning
    </Badge>
    <Badge className={`${styles.badge} ${styles.danger}`}>
      <span className={styles.dot} />
      Error
    </Badge>
    <Badge className={`${styles.badge} ${styles.info}`}>
      <span className={styles.dot} />
      Info
    </Badge>
    <Badge className={`${styles.badge} ${styles.counter}`}>9</Badge>
  </div>
);

Default.parameters = withStorySource(storySource);
