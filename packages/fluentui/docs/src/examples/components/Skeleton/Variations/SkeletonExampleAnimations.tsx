import * as React from 'react';
import { Skeleton, Flex } from '@fluentui/react-northstar';

const SkeletonExampleAnimations = () => (
  <Flex column gap="gap.medium">
    <Skeleton animation="pulse">
      <Skeleton.Shape />
      <Skeleton.Line />
      <Skeleton.Line width="70%" />
      <Skeleton.Line width="50%" />
    </Skeleton>
    <Skeleton animation="wave">
      <Skeleton.Shape />
      <Skeleton.Line />
      <Skeleton.Line width="70%" />
      <Skeleton.Line width="50%" />
    </Skeleton>
  </Flex>
);

export default SkeletonExampleAnimations;
