import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Menu } from '@fluentui/react-northstar';
import getScreenerSteps from './commonScreenerSteps';
import { getThemeStoryVariant } from '../utilities';
import MenuExamplePointing from '../../examples/components/Menu/Types/MenuExamplePointing.shorthand';

export default {
  component: Menu,
  title: 'Menu',
  decorators: [story => <Screener steps={getScreenerSteps({})}>{story()}</Screener>],
} as ComponentMeta<typeof Menu>;

const MenuExamplePointingTeams = getThemeStoryVariant(MenuExamplePointing, 'teamsV2');

const MenuExamplePointingTeamsDark = getThemeStoryVariant(MenuExamplePointing, 'teamsDarkV2');

const MenuExamplePointingTeamsHighContrast = getThemeStoryVariant(MenuExamplePointing, 'teamsHighContrast');

export {
  MenuExamplePointing,
  MenuExamplePointingTeams,
  MenuExamplePointingTeamsDark,
  MenuExamplePointingTeamsHighContrast,
};
