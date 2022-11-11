import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Menu } from '@fluentui/react-northstar';
import getScreenerSteps from './commonScreenerSteps';
import { getThemeStoryVariant } from '../utilities';
import MenuExampleIconOnly from '../../examples/components/Menu/Slots/MenuExampleIconOnly.shorthand';

export default {
  component: Menu,
  title: 'Menu',
  decorators: [story => <Screener steps={getScreenerSteps({})}>{story()}</Screener>],
} as ComponentMeta<typeof Menu>;

const MenuExampleIconOnlyTeams = getThemeStoryVariant(MenuExampleIconOnly, 'teamsV2');

const MenuExampleIconOnlyTeamsDark = getThemeStoryVariant(MenuExampleIconOnly, 'teamsDarkV2');

const MenuExampleIconOnlyTeamsHighContrast = getThemeStoryVariant(MenuExampleIconOnly, 'teamsHighContrast');

export {
  MenuExampleIconOnly,
  MenuExampleIconOnlyTeams,
  MenuExampleIconOnlyTeamsDark,
  MenuExampleIconOnlyTeamsHighContrast,
};
