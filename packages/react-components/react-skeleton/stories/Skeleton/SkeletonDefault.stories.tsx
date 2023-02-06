import * as React from 'react';
import { Skeleton, SkeletonLine, SkeletonProps } from '@fluentui/react-skeleton';

export const Default = (props: Partial<SkeletonProps>) => {
  <Skeleton {...props}>
    <SkeletonLine />
  </Skeleton>;
};
