import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Flex, Text, Video } from '@fluentui/react-northstar';

export default { component: Video, title: 'Video' } as ComponentMeta<typeof Video>;

const VideoExample = () => (
  <Flex column>
    <Video variables={{ width: '600px' }} />
    <Text>(c) copyright 2020, Microsoft</Text>
  </Flex>
);

export { VideoExample };
