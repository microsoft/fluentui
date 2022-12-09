import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Video } from '@fluentui/react-northstar';
// eslint-disable-next-line import/no-extraneous-dependencies
import { StoryWright, Steps } from 'storywright';
import VideoExample from '../../examples/components/Video/Types/VideoExample.shorthand';

export default {
  component: Video,
  title: 'Video',
  decorators: [story => <StoryWright steps={new Steps().wait(3000).end()}>{story()}</StoryWright>],
} as ComponentMeta<typeof Video>;

export { VideoExample };
