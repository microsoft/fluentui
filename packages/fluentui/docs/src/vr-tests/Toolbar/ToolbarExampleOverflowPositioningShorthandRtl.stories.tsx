import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { Meta } from '@storybook/react';
import { Toolbar } from '@fluentui/react-northstar';
import ToolbarExampleOverflowPositioningShorthandRtl from '../../examples/components/Toolbar/Visual/ToolbarExampleOverflowPositioning.rtl';

export default {
  component: Toolbar,
  title: 'Toolbar',
  decorators: [
    story => (
      <StoryWright
        steps={new Steps()
          .executeScript("document.querySelector('iframe').contentDocument.querySelector('#overflow-item').click()")
          .snapshot('RTL: Overflow item is properly positioned')
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} as Meta<typeof Toolbar>;

export { ToolbarExampleOverflowPositioningShorthandRtl };
