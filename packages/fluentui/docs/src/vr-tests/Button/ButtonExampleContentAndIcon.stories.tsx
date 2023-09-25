import * as React from 'react';
import { StoryWright } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Button } from '@fluentui/react-northstar';
import StoryWrightSteps from './commonStoryWrightSteps';
import { getThemeStoryVariant } from '../utilities/getThemeStoryVariant';
import ButtonExampleContentAndIcon from '../../examples/components/Button/Usage/ButtonExampleContentAndIcon.shorthand';

export default {
  component: Button,
  title: 'Button',
  decorators: [story => <StoryWright steps={StoryWrightSteps}>{story()}</StoryWright>],
} as ComponentMeta<typeof Button>;

const ButtonExampleContentAndIconTeams = getThemeStoryVariant(ButtonExampleContentAndIcon, 'teamsV2');

const ButtonExampleContentAndIconTeamsDark = getThemeStoryVariant(ButtonExampleContentAndIcon, 'teamsDarkV2');

const ButtonExampleContentAndIconTeamsHighContrast = getThemeStoryVariant(
  ButtonExampleContentAndIcon,
  'teamsHighContrast',
);

export {
  ButtonExampleContentAndIcon,
  ButtonExampleContentAndIconTeams,
  ButtonExampleContentAndIconTeamsDark,
  ButtonExampleContentAndIconTeamsHighContrast,
};
