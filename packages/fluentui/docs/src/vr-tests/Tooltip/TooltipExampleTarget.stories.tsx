import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { Meta } from '@storybook/react';
import { Tooltip, buttonClassName } from '@fluentui/react-northstar';
import TooltipExampleTarget from '../../examples/components/Tooltip/Usage/TooltipExampleTarget.shorthand';

export default {
  component: Tooltip,
  title: 'Tooltip',
  decorators: [
    story => (
      <StoryWright steps={new Steps().hover(`.${buttonClassName}`).snapshot('Custom target: Shows tooltip').end()}>
        {story()}
      </StoryWright>
    ),
  ],
} as Meta<typeof Tooltip>;

export { TooltipExampleTarget };
