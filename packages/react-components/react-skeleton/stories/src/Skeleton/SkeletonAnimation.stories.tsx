import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, Skeleton, SkeletonItem } from '@fluentui/react-components';
import type { SkeletonProps } from '@fluentui/react-components';

import styles from './SkeletonAnimation.module.css';

export const Animation = (props: Partial<SkeletonProps>): JSXElement => {
  return (
    <div className={styles.invertedWrapper}>
      <Field validationMessage="Wave animation" validationState="none">
        <Skeleton {...props} aria-label="Loading Content">
          <SkeletonItem />
        </Skeleton>
      </Field>
      <Field validationMessage="Pulse animation" validationState="none">
        <Skeleton {...props} animation="pulse" aria-label="Loading Content">
          <SkeletonItem />
        </Skeleton>
      </Field>
    </div>
  );
};

Animation.parameters = {
  docs: {
    description: {
      story: `You can specify the animation style of the Skeleton.
      The default is 'wave' with the alternative being 'pulse'`,
    },
  },
};
