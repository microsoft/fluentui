import * as React from 'react';
import { Skeleton, SkeletonItem } from '@fluentui/react-headless-components-preview/skeleton';

import styles from './skeleton.module.css';
import storySource from './SkeletonDefault.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';
export const Default = (): React.ReactNode => (
  <Skeleton className={`${styles.card} ${styles.demo}`}>
    <div className={styles.row}>
      <SkeletonItem className={styles.circle} />
      <div className={styles.demoFlex}>
        <SkeletonItem className={`${styles.bar} ${styles.line60}`} />
        <SkeletonItem className={`${styles.bar} ${styles.line40}`} />
      </div>
    </div>
    <SkeletonItem className={`${styles.bar} ${styles.line100}`} />
    <SkeletonItem className={`${styles.bar} ${styles.line100}`} />
    <SkeletonItem className={`${styles.bar} ${styles.line80}`} />
  </Skeleton>
);

Default.parameters = withStorySource(storySource);
