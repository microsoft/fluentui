import * as React from 'react';
import { Skeleton, SkeletonItem, SkeletonProps } from '@fluentui/react-skeleton';

export const Default = (props: Partial<SkeletonProps>) => (
  <Skeleton {...props}>
    <SkeletonItem />
  </Skeleton>
);
