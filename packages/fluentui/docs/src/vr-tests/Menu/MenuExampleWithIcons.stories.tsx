import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Menu } from '@fluentui/react-northstar';
import getScreenerSteps from './commonScreenerSteps';
import MenuExampleWithIcons from '../../examples/components/Menu/Slots/MenuExampleWithIcons.shorthand';

export default {
  component: Menu,
  title: 'Menu',
  decorators: [story => <Screener steps={getScreenerSteps({})}>{story()}</Screener>],
} as ComponentMeta<typeof Menu>;

export { MenuExampleWithIcons };
