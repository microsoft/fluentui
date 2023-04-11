import * as React from 'react';
import { Skeleton, SkeletonItem } from '@fluentui/react-components/unstable';
import type { SkeletonProps } from '@fluentui/react-components/unstable';

export const Default = (props: Partial<SkeletonProps>) => (
  <Skeleton {...props}>
    <SkeletonItem />
  </Skeleton>
);
