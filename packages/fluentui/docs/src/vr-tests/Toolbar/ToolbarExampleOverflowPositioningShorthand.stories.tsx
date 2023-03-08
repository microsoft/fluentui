import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Toolbar } from '@fluentui/react-northstar';
import ToolbarExampleOverflowPositioningShorthand from '../../examples/components/Toolbar/Visual/ToolbarExampleOverflowPositioning.shorthand';

export default {
  component: Toolbar,
  title: 'Toolbar',
  decorators: [
    story => (
      <StoryWright
        steps={new Steps()
          .executeScript("document.querySelector('iframe').contentDocument.querySelector('#overflow-item').click()")
          .snapshot('Overflow item is properly positioned')
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Toolbar>;

export { ToolbarExampleOverflowPositioningShorthand };
