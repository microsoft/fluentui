import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Toolbar } from '@fluentui/react-northstar';
import ToolbarExampleVariables from '../../examples/components/Toolbar/Visual/ToolbarExampleVariables.shorthand';

export default {
  component: Toolbar,
  title: 'Toolbar',
  decorators: [
    story => (
      <Screener
        steps={new Steps()
          .click('#open-menu')
          .snapshot('Shows a usual menu')
          .click('#open-menu-variables')
          .snapshot('Shows a styled menu')
          .end()}
      >
        {story()}
      </Screener>
    ),
  ],
} as ComponentMeta<typeof Toolbar>;

export { ToolbarExampleVariables };
