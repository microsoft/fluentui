import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Skeleton, SkeletonItem, Text } from '@fluentui/react-components';

import styles from './SkeletonItemSize.module.css';

const SIZES = [8, 12, 14, 16, 20, 22, 24, 28, 32, 36, 40, 48, 52, 56, 64, 72, 92, 96, 120, 128] as const;

export const Size = (): JSXElement => {
  return (
    <div className={styles.wrapper}>
      {SIZES.map(size => (
        <div key={size} className={styles.innerWrapper}>
          <Text align="center">{size}</Text>
          <Skeleton aria-label="Loading Content">
            <SkeletonItem size={size} />
          </Skeleton>
        </div>
      ))}
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: `You can specify the size of the \`SkeletonItem\` by using the \`size\` prop.
      The size is a number that represents the height of the \`SkeletonItem\` in pixels`,
    },
  },
};
