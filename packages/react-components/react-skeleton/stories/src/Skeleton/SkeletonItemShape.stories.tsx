import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Skeleton, SkeletonItem } from '@fluentui/react-components';

import styles from './SkeletonItemShape.module.css';

export const Shape = (): JSXElement => {
  return (
    <div className={styles.invertedWrapper}>
      <Skeleton className={styles.row} aria-label="Loading Content">
        <SkeletonItem size={64} shape="circle" />
        <SkeletonItem size={64} shape="rectangle" />
        <SkeletonItem size={64} shape="square" />
      </Skeleton>
    </div>
  );
};

Shape.parameters = {
  docs: {
    description: {
      story: `The shape of the \`SkeletonItem\` can be set to circle, rectangle, or square.`,
    },
  },
};
