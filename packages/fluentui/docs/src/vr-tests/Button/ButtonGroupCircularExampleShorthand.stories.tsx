import * as React from 'react';
import { StoryWright } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Button } from '@fluentui/react-northstar';
import StoryWrightSteps from './commonStoryWrightSteps';
import { getThemeStoryVariant } from '../utilities/getThemeStoryVariant';
import ButtonGroupCircularExampleShorthand from '../../examples/components/Button/Groups/ButtonGroupCircularExample.shorthand';

export default {
  component: Button,
  title: 'Button',
  decorators: [story => <StoryWright steps={StoryWrightSteps}>{story()}</StoryWright>],
} as ComponentMeta<typeof Button>;

const ButtonGroupCircularExampleShorthandTeams = getThemeStoryVariant(ButtonGroupCircularExampleShorthand, 'teamsV2');

const ButtonGroupCircularExampleShorthandTeamsDark = getThemeStoryVariant(
  ButtonGroupCircularExampleShorthand,
  'teamsDarkV2',
);

const ButtonGroupCircularExampleShorthandTeamsHighContrast = getThemeStoryVariant(
  ButtonGroupCircularExampleShorthand,
  'teamsHighContrast',
);

export {
  ButtonGroupCircularExampleShorthand,
  ButtonGroupCircularExampleShorthandTeams,
  ButtonGroupCircularExampleShorthandTeamsDark,
  ButtonGroupCircularExampleShorthandTeamsHighContrast,
};
