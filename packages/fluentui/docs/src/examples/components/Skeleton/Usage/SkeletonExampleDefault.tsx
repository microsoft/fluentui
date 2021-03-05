import * as React from 'react';
import { Skeleton } from '@fluentui/react-northstar';

const SkeletonExampleDefault = () => (
  <Skeleton>
    <Skeleton.Shape />
    <Skeleton.Line />
    <Skeleton.Line width="70%" />
    <Skeleton.Line width="50%" />
  </Skeleton>
);

export default SkeletonExampleDefault;
