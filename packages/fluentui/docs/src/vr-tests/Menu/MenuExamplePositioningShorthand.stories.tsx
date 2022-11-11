import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Menu } from '@fluentui/react-northstar';
import MenuExamplePositioningShorthand from '../../examples/components/Menu/Visual/MenuExamplePositioning.shorthand';

export default {
  component: Menu,
  title: 'Menu',
  decorators: [
    story => (
      <Screener
        steps={new Steps()
          .click('#set-open')
          .snapshot('Default positioning')
          .click('#above')
          .snapshot('Sets positions to above')
          .click('#before')
          .snapshot('Sets positions to before')
          .end()}
      >
        {story()}
      </Screener>
    ),
  ],
} as ComponentMeta<typeof Menu>;

export { MenuExamplePositioningShorthand };
