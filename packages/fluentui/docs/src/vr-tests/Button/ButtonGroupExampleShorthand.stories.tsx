import * as React from 'react';
import { StoryWright } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Button } from '@fluentui/react-northstar';
import StoryWrightSteps from './commonStoryWrightSteps';
import { getThemeStoryVariant } from '../utilities/getThemeStoryVariant';
import ButtonGroupExampleShorthand from '../../examples/components/Button/Groups/ButtonGroupExample.shorthand';

export default {
  component: Button,
  title: 'Button',
  decorators: [story => <StoryWright steps={StoryWrightSteps}>{story()}</StoryWright>],
} as ComponentMeta<typeof Button>;

const ButtonGroupExampleShorthandTeams = getThemeStoryVariant(ButtonGroupExampleShorthand, 'teamsV2');

const ButtonGroupExampleShorthandTeamsDark = getThemeStoryVariant(ButtonGroupExampleShorthand, 'teamsDarkV2');

const ButtonGroupExampleShorthandTeamsHighContrast = getThemeStoryVariant(
  ButtonGroupExampleShorthand,
  'teamsHighContrast',
);

export {
  ButtonGroupExampleShorthand,
  ButtonGroupExampleShorthandTeams,
  ButtonGroupExampleShorthandTeamsDark,
  ButtonGroupExampleShorthandTeamsHighContrast,
};
