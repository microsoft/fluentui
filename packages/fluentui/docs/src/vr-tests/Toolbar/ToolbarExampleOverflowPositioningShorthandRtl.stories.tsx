import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Toolbar } from '@fluentui/react-northstar';
import ToolbarExampleOverflowPositioningShorthandRtl from '../../examples/components/Toolbar/Visual/ToolbarExampleOverflowPositioning.rtl';

export default {
  component: Toolbar,
  title: 'Toolbar',
  decorators: [
    story => (
      <Screener
        steps={new Steps()
          .executeScript("document.querySelector('iframe').contentDocument.querySelector('#overflow-item').click()")
          .snapshot('RTL: Overflow item is properly positioned')
          .end()}
      >
        {story()}
      </Screener>
    ),
  ],
} as ComponentMeta<typeof Toolbar>;

export { ToolbarExampleOverflowPositioningShorthandRtl };
