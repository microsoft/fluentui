import * as React from 'react';
import { StoryWright } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Menu } from '@fluentui/react-northstar';
import getStoryWrightSteps from './commonStoryWrightSteps';
import { getThemeStoryVariant } from '../utilities';
import MenuExamplePointing from '../../examples/components/Menu/Types/MenuExamplePointing.shorthand';

export default {
  component: Menu,
  title: 'Menu',
  decorators: [story => <StoryWright steps={getStoryWrightSteps({})}>{story()}</StoryWright>],
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
