import * as React from 'react';
import { Skeleton, Flex, Text } from '@fluentui/react-northstar';

const SkeletonExampleComponents = () => (
  <Flex column gap="gap.medium">
    <Text size="large">Button</Text>
    <Skeleton>
      <Flex gap="gap.medium">
        <Skeleton.Button />
        <Skeleton.Button size="small" />
        <Skeleton.Button circular />
        <Skeleton.Button circular size="small" />
        <Skeleton.Button iconOnly />
        <Skeleton.Button iconOnly size="small" />
      </Flex>
    </Skeleton>
  </Flex>
);

export default SkeletonExampleComponents;
