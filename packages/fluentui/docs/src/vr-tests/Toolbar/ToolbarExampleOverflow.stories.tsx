import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Toolbar } from '@fluentui/react-northstar';
import ToolbarExampleOverflow from '../../examples/components/Toolbar/Visual/ToolbarExampleChatMessage';

export default {
  component: Toolbar,
  title: 'Toolbar',
  decorators: [
    story => (
      <Screener
        steps={new Steps().click('[title="More"').snapshot('Toolbar fits within bounds of the chat message').end()}
      >
        {story()}
      </Screener>
    ),
  ],
} as ComponentMeta<typeof Toolbar>;

export { ToolbarExampleOverflow };
