import * as React from 'react';
import { StoryWright } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Menu } from '@fluentui/react-northstar';
import getStoryWrightSteps from './commonStoryWrightSteps';
import { getThemeStoryVariant } from '../utilities';
import MenuExample from '../../examples/components/Menu/Slots/MenuExampleSlot.shorthand';

export default {
  component: Menu,
  title: 'Menu',
  decorators: [story => <StoryWright steps={getStoryWrightSteps({})}>{story()}</StoryWright>],
} as ComponentMeta<typeof Menu>;

const MenuExampleTeams = getThemeStoryVariant(MenuExample, 'teamsV2');

const MenuExampleTeamsDark = getThemeStoryVariant(MenuExample, 'teamsDarkV2');

const MenuExampleTeamsHighContrast = getThemeStoryVariant(MenuExample, 'teamsHighContrast');

export { MenuExample, MenuExampleTeams, MenuExampleTeamsDark, MenuExampleTeamsHighContrast };
