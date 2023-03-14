import * as React from 'react';
import { StoryWright } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Button } from '@fluentui/react-northstar';
import StoryWrightSteps from './commonStoryWrightSteps';
import { getThemeStoryVariant } from '../utilities/getThemeStoryVariant';
import ButtonExampleWithTooltip from '../../examples/components/Button/Usage/ButtonExampleWithTooltip.shorthand';

export default {
  component: Button,
  title: 'Button',
  decorators: [story => <StoryWright steps={StoryWrightSteps}>{story()}</StoryWright>],
} as ComponentMeta<typeof Button>;

const ButtonExampleWithTooltipTeams = getThemeStoryVariant(ButtonExampleWithTooltip, 'teamsV2');

const ButtonExampleWithTooltipTeamsDark = getThemeStoryVariant(ButtonExampleWithTooltip, 'teamsDarkV2');

const ButtonExampleWithTooltipTeamsHighContrast = getThemeStoryVariant(ButtonExampleWithTooltip, 'teamsHighContrast');

export {
  ButtonExampleWithTooltip,
  ButtonExampleWithTooltipTeams,
  ButtonExampleWithTooltipTeamsDark,
  ButtonExampleWithTooltipTeamsHighContrast,
};
