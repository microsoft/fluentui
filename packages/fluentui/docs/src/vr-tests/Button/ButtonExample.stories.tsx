import * as React from 'react';
import { StoryWright } from 'storywright';
import { Meta } from '@storybook/react';
import { Button } from '@fluentui/react-northstar';
import StoryWrightSteps from './commonStoryWrightSteps';
import { getThemeStoryVariant } from '../utilities/getThemeStoryVariant';
import ButtonExample from '../../examples/components/Button/Types/ButtonExample.shorthand';

export default {
  component: Button,
  title: 'Button',
  decorators: [story => <StoryWright steps={StoryWrightSteps}>{story()}</StoryWright>],
} as Meta<typeof Button>;

const ButtonExampleTeams = getThemeStoryVariant(ButtonExample, 'teamsV2');

const ButtonExampleTeamsDark = getThemeStoryVariant(ButtonExample, 'teamsDarkV2');

const ButtonExampleTeamsHighContrast = getThemeStoryVariant(ButtonExample, 'teamsHighContrast');

export { ButtonExample, ButtonExampleTeams, ButtonExampleTeamsDark, ButtonExampleTeamsHighContrast };
