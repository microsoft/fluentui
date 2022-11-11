import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Menu } from '@fluentui/react-northstar';
import getScreenerSteps from './commonScreenerSteps';
import MenuExampleWithSubMenu from '../../examples/components/Menu/Usage/MenuExampleWithSubmenu.shorthand';

export default {
  component: Menu,
  title: 'Menu',
  decorators: [story => <Screener steps={getScreenerSteps({})}>{story()}</Screener>],
} as ComponentMeta<typeof Menu>;

export { MenuExampleWithSubMenu };
