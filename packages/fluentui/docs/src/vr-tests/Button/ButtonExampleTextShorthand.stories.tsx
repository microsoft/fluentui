import * as React from 'react';
import { StoryWright } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Button } from '@fluentui/react-northstar';
import StoryWrightSteps from './commonStoryWrightSteps';
import { getThemeStoryVariant } from '../utilities/getThemeStoryVariant';
import ButtonExampleTextShorthand from '../../examples/components/Button/Types/ButtonExampleText.shorthand';

export default {
  component: Button,
  title: 'Button',
  decorators: [story => <StoryWright steps={StoryWrightSteps}>{story()}</StoryWright>],
} as ComponentMeta<typeof Button>;

const ButtonExampleTextShorthandTeams = getThemeStoryVariant(ButtonExampleTextShorthand, 'teamsV2');

const ButtonExampleTextShorthandTeamsDark = getThemeStoryVariant(ButtonExampleTextShorthand, 'teamsDarkV2');

const ButtonExampleTextShorthandTeamsHighContrast = getThemeStoryVariant(
  ButtonExampleTextShorthand,
  'teamsHighContrast',
);

export {
  ButtonExampleTextShorthand,
  ButtonExampleTextShorthandTeams,
  ButtonExampleTextShorthandTeamsDark,
  ButtonExampleTextShorthandTeamsHighContrast,
};
