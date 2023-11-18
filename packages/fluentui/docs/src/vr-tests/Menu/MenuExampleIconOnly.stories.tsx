import * as React from 'react';
import { StoryWright } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Menu } from '@fluentui/react-northstar';
import getStoryWrightSteps from './commonStoryWrightSteps';
import { getThemeStoryVariant } from '../utilities';
import MenuExampleIconOnly from '../../examples/components/Menu/Slots/MenuExampleIconOnly.shorthand';

export default {
  component: Menu,
  title: 'Menu',
  decorators: [story => <StoryWright steps={getStoryWrightSteps({})}>{story()}</StoryWright>],
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
