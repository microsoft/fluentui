import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { StoryWright } from 'storywright';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Alert } from '@fluentui/react-northstar';
import StoryWrightSteps from './commonStoryWrightSteps';
import { getThemeStoryVariant } from '../utilities/getThemeStoryVariant';
import AlertExampleUrgent from '../../examples/components/Alert/Variations/AlertExampleUrgent.shorthand';

export default {
  component: Alert,
  title: 'Alert',
  decorators: [story => <StoryWright steps={StoryWrightSteps}>{story()}</StoryWright>],
} as ComponentMeta<typeof Alert>;

const AlertExampleUrgentTeams = getThemeStoryVariant(AlertExampleUrgent, 'teamsV2');

const AlertExampleUrgentTeamsDark = getThemeStoryVariant(AlertExampleUrgent, 'teamsDarkV2');

const AlertExampleUrgentTeamsHighContrast = getThemeStoryVariant(AlertExampleUrgent, 'teamsHighContrast');

export {
  AlertExampleUrgent,
  AlertExampleUrgentTeams,
  AlertExampleUrgentTeamsDark,
  AlertExampleUrgentTeamsHighContrast,
};
