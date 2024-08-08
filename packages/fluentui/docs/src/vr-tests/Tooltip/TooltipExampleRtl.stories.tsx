import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { Meta } from '@storybook/react';
import { Tooltip, buttonClassName } from '@fluentui/react-northstar';
import TooltipExampleRtl from '../../examples/components/Tooltip/Rtl/TooltipExample.rtl';

export default {
  component: Tooltip,
  title: 'Tooltip',
  decorators: [
    story => (
      <StoryWright steps={new Steps().hover(`.${buttonClassName}`).snapshot('RTL: Shows tooltip').end()}>
        {story()}
      </StoryWright>
    ),
  ],
} as Meta<typeof Tooltip>;

export { TooltipExampleRtl };
