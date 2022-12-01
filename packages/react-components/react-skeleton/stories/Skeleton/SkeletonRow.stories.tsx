import * as React from 'react';
import { Skeleton, SkeletonProps } from '@fluentui/react-skeleton';
import { SkeletonCircle } from '../../src/components/SkeletonCircle/SkeletonCircle';
import { SkeletonLine } from '../../src/components/SkeletonLine/SkeletonLine';
import { SkeletonGap } from '../../src/components/SkeletonGap/SkeletonGap';

const SkeletonElementsFirstRow = () => {
  return (
    <div style={{ display: 'flex', paddingBottom: '10px' }}>
      <SkeletonCircle />
      <SkeletonGap width="2%" height="24px" />
      <SkeletonLine height="24px" />
    </div>
  );
};
const SkeletonElementsSecondRow = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SkeletonCircle height="24px" />
      <SkeletonGap width="2%" height="24px" />
      <SkeletonLine height="16px" width="20%" />
      <SkeletonGap width="5%" height="24px" />
      <SkeletonLine height="16px" width="20%" />
      <SkeletonGap width="10%" height="24px" />
      <SkeletonLine height="16px" width="15%" />
      <SkeletonGap width="10%" height="24px" />
      <SkeletonLine height="16px" width="15%" />
    </div>
  );
};

const SkeletonElementsThirdRow = () => {
  return (
    <div style={{ display: 'flex', paddingBottom: '10px' }}>
      <SkeletonCircle height="24px" />
      <SkeletonGap width="2%" height="24px" />
      <SkeletonLine height="16px" width="20%" />
      <SkeletonGap width="5%" height="24px" />
      <SkeletonLine height="16px" width="20%" />
      <SkeletonGap width="10%" height="24px" />
      <SkeletonLine height="16px" width="15%" />
      <SkeletonGap width="10%" height="24px" />
      <SkeletonLine height="16px" width="15%" />
    </div>
  );
};

export const Row = (props: Partial<SkeletonProps>) => {
  return (
    <Skeleton {...props}>
      <SkeletonElementsFirstRow />
      <SkeletonElementsSecondRow />
      <SkeletonElementsThirdRow />
    </Skeleton>
  );
};
