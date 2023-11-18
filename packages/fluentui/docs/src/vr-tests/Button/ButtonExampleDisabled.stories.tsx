import * as React from 'react';
import { StoryWright } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Button } from '@fluentui/react-northstar';
import StoryWrightSteps from './commonStoryWrightSteps';
import { getThemeStoryVariant } from '../utilities/getThemeStoryVariant';
import ButtonExampleDisabled from '../../examples/components/Button/States/ButtonExampleDisabled.shorthand';

export default {
  component: Button,
  title: 'Button',
  decorators: [story => <StoryWright steps={StoryWrightSteps}>{story()}</StoryWright>],
} as ComponentMeta<typeof Button>;

const ButtonExampleDisabledTeams = getThemeStoryVariant(ButtonExampleDisabled, 'teamsV2');

const ButtonExampleDisabledTeamsDark = getThemeStoryVariant(ButtonExampleDisabled, 'teamsDarkV2');

const ButtonExampleDisabledTeamsHighContrast = getThemeStoryVariant(ButtonExampleDisabled, 'teamsHighContrast');

export {
  ButtonExampleDisabled,
  ButtonExampleDisabledTeams,
  ButtonExampleDisabledTeamsDark,
  ButtonExampleDisabledTeamsHighContrast,
};
