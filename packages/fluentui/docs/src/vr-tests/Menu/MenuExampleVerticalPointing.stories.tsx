import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Menu } from '@fluentui/react-northstar';
import getScreenerSteps from './commonScreenerSteps';
import MenuExampleVerticalPointing from '../../examples/components/Menu/Variations/MenuExampleVerticalPointing.shorthand';

export default {
  component: Menu,
  title: 'Menu',
  decorators: [story => <Screener steps={getScreenerSteps({ vertical: true })}>{story()}</Screener>],
} as ComponentMeta<typeof Menu>;

export { MenuExampleVerticalPointing };
