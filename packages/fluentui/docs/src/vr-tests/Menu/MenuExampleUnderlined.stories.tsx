import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Menu } from '@fluentui/react-northstar';
import getScreenerSteps from './commonScreenerSteps';
import { getThemeStoryVariant } from '../utilities';
import MenuExampleUnderlined from '../../examples/components/Menu/Types/MenuExampleUnderlined.shorthand';

export default {
  component: Menu,
  title: 'Menu',
  decorators: [story => <Screener steps={getScreenerSteps({})}>{story()}</Screener>],
} as ComponentMeta<typeof Menu>;

const MenuExampleUnderlinedTeams = getThemeStoryVariant(MenuExampleUnderlined, 'teamsV2');

const MenuExampleUnderlinedTeamsDark = getThemeStoryVariant(MenuExampleUnderlined, 'teamsDarkV2');

const MenuExampleUnderlinedTeamsHighContrast = getThemeStoryVariant(MenuExampleUnderlined, 'teamsHighContrast');

export {
  MenuExampleUnderlined,
  MenuExampleUnderlinedTeams,
  MenuExampleUnderlinedTeamsDark,
  MenuExampleUnderlinedTeamsHighContrast,
};
