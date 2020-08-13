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
          <Flex.Item>
            <Skeleton.Button fluid />
          </Flex.Item>
        </Flex>
      </Skeleton>
    </Flex>
    <Flex column gap="gap.medium">
      <Text size="large" weight="bold">
        Avatar
      </Text>
      <Skeleton>
        <Flex gap="gap.medium" column>
          <Flex gap="gap.medium">
            <Skeleton.Avatar size="largest" />
            <Skeleton.Avatar size="larger" />
            <Skeleton.Avatar size="large" />
            <Skeleton.Avatar size="medium" />
            <Skeleton.Avatar size="small" />
            <Skeleton.Avatar size="smaller" />
            <Skeleton.Avatar size="smallest" />
          </Flex>
        </Flex>
      </Skeleton>
    </Flex>
  </Flex>
);

export default SkeletonExampleComponents;
