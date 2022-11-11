import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Tooltip, buttonClassName } from '@fluentui/react-northstar';
import TooltipExampleRtl from '../../examples/components/Tooltip/Rtl/TooltipExample.rtl';

export default {
  component: Tooltip,
  title: 'Tooltip',
  decorators: [
    story => (
      <Screener steps={new Steps().hover(`.${buttonClassName}`).snapshot('RTL: Shows tooltip').end()}>
        {story()}
      </Screener>
    ),
  ],
} as ComponentMeta<typeof Tooltip>;

export { TooltipExampleRtl };
