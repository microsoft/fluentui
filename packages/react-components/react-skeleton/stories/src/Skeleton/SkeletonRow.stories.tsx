import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Skeleton, SkeletonItem } from '@fluentui/react-components';
import type { SkeletonProps } from '@fluentui/react-components';

import styles from './SkeletonRow.module.css';

export const Row = (props: Partial<SkeletonProps>): JSXElement => {
  return (
    <div className={styles.invertedWrapper}>
      <Skeleton {...props} size={20} aria-label="Loading Content">
        <div className={styles.firstRow}>
          <SkeletonItem shape="circle" size={24} />
          <SkeletonItem shape="rectangle" />
        </div>
        <div className={styles.secondThirdRow}>
          <SkeletonItem shape="circle" size={24} />
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
        </div>
        <div className={styles.secondThirdRow}>
          <SkeletonItem shape="square" size={24} />
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
        </div>
      </Skeleton>
    </div>
  );
};

Row.parameters = {
  docs: {
    description: {
      story: `You can make more complex wireframes using the basic building blocks of the Skeleton.`,
    },
  },
};
