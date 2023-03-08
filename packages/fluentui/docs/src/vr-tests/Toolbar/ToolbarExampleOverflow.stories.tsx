import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Toolbar } from '@fluentui/react-northstar';
import ToolbarExampleOverflow from '../../examples/components/Toolbar/Visual/ToolbarExampleChatMessage';

export default {
  component: Toolbar,
  title: 'Toolbar',
  decorators: [
    story => (
      <StoryWright
        steps={new Steps().click('[title="More"').snapshot('Toolbar fits within bounds of the chat message').end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Toolbar>;

export { ToolbarExampleOverflow };
