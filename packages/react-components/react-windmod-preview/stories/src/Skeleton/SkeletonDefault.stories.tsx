import * as React from 'react';
import { Skeleton, SkeletonItem, ThemeProvider } from '@fluentui/react-windmod-preview';

import styles from '../compare.module.css';

const shapes = ['rectangle', 'square', 'circle'] as const;

export const Default = (): React.ReactNode => (
  <ThemeProvider>
    <div className={styles.stack}>
      <Skeleton>
        <div className={styles.stack} style={{ width: 320 }}>
          <SkeletonItem size={16} />
          <SkeletonItem size={24} />
          <SkeletonItem size={48} />
        </div>
      </Skeleton>
      <div className={styles.row}>
        {shapes.map(shape => (
          <SkeletonItem key={shape} shape={shape} size={64} />
        ))}
      </div>
      <Skeleton animation="pulse" size={32} shape="square">
        <div className={styles.row}>
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem shape="circle" />
        </div>
      </Skeleton>
      {/* translucent composites to the opaque colour over white — only a mid-grey ground shows it. */}
      <div className={styles.row} style={{ background: '#8a8a8a', padding: 12 }}>
        <Skeleton appearance="translucent" size={32} shape="circle">
          <div className={styles.row}>
            <SkeletonItem />
            <SkeletonItem animation="pulse" />
            <SkeletonItem appearance="opaque" />
          </div>
        </Skeleton>
      </div>
    </div>
  </ThemeProvider>
);
