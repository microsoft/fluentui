import * as React from 'react';
import { StoryWright } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Menu } from '@fluentui/react-northstar';
import getStoryWrightSteps from './commonStoryWrightSteps';
import { getThemeStoryVariant } from '../utilities';
import MenuExampleUnderlined from '../../examples/components/Menu/Types/MenuExampleUnderlined.shorthand';

export default {
  component: Menu,
  title: 'Menu',
  decorators: [story => <StoryWright steps={getStoryWrightSteps({})}>{story()}</StoryWright>],
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
