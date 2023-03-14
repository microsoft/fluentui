import * as React from 'react';
import { Skeleton, SkeletonItem } from '@fluentui/react-skeleton';
import type { SkeletonProps } from '@fluentui/react-skeleton';

export const Default = (props: Partial<SkeletonProps>) => (
  <Skeleton {...props}>
    <SkeletonItem />
  </Skeleton>
);
