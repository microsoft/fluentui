import * as React from 'react';
import { StoryWright } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Alert } from '@fluentui/react-northstar';
import StoryWrightSteps from './commonStoryWrightSteps';
import { getThemeStoryVariant } from '../utilities/getThemeStoryVariant';
import AlertExampleDismissible from '../../examples/components/Alert/Types/AlertExampleDismissible.shorthand';

export default {
  component: Alert,
  title: 'Alert',
  decorators: [story => <StoryWright steps={StoryWrightSteps}>{story()}</StoryWright>],
} as ComponentMeta<typeof Alert>;

const AlertExampleDismissibleTeams = getThemeStoryVariant(AlertExampleDismissible, 'teamsV2');

const AlertExampleDismissibleTeamsDark = getThemeStoryVariant(AlertExampleDismissible, 'teamsDarkV2');

const AlertExampleDismissibleTeamsHighContrast = getThemeStoryVariant(AlertExampleDismissible, 'teamsHighContrast');

export {
  AlertExampleDismissible,
  AlertExampleDismissibleTeams,
  AlertExampleDismissibleTeamsDark,
  AlertExampleDismissibleTeamsHighContrast,
};
