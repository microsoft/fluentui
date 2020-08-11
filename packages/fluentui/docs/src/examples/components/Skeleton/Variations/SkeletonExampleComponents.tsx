import * as React from 'react';
import { Skeleton, Flex, Text } from '@fluentui/react-northstar';

const SkeletonExampleComponents = () => (
  <Flex column gap="gap.medium">
    <Flex column gap="gap.medium">
      <Text size="large" weight="bold">
        Button
      </Text>
      <Skeleton>
        <Flex gap="gap.medium" column>
          <Flex gap="gap.medium">
            <Skeleton.Button />
            <Skeleton.Button size="small" />
            <Skeleton.Button circular />
            <Skeleton.Button circular size="small" />
            <Skeleton.Button iconOnly />
            <Skeleton.Button iconOnly size="small" />
          </Flex>
          <div>
            <Skeleton.Button fluid />
          </div>
        </Flex>
      </Skeleton>
    </Flex>
    <Flex column gap="gap.medium">
      <Text size="large" weight="bold">
        Text
      </Text>
      <Skeleton>
        <Flex gap="gap.medium" column>
          <Skeleton.Text size="smaller" />
          <Skeleton.Text size="small" />
          <Skeleton.Text size="medium" />
          <Skeleton.Text size="large" />
          <Skeleton.Text size="larger" />
        </Flex>
      </Skeleton>
    </Flex>
  </Flex>
);

export default SkeletonExampleComponents;
