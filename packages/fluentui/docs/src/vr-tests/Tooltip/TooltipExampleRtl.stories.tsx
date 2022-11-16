import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { StoryWright, Steps } from 'storywright';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
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
} as ComponentMeta<typeof Tooltip>;

export { TooltipExampleRtl };
