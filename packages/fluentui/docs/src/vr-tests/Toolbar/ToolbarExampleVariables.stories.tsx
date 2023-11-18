import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Toolbar } from '@fluentui/react-northstar';
import ToolbarExampleVariables from '../../examples/components/Toolbar/Visual/ToolbarExampleVariables.shorthand';

export default {
  component: Toolbar,
  title: 'Toolbar',
  decorators: [
    story => (
      <StoryWright
        steps={new Steps()
          .click('#open-menu')
          .snapshot('Shows a usual menu')
          .click('#open-menu-variables')
          .snapshot('Shows a styled menu')
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Toolbar>;

export { ToolbarExampleVariables };
