import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { StoryWright } from 'storywright';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Alert } from '@fluentui/react-northstar';
import { getFocusStoryWrightSteps, getHoverStoryWrightSteps } from './commonStoryWrightSteps';
import { getThemeStoryVariant } from '../utilities/getThemeStoryVariant';
import AlertExampleDanger from '../../examples/components/Alert/Variations/AlertExampleDanger.shorthand';

export default {
  component: Alert,
  title: 'Alert',
  decorators: [
    story => <StoryWright steps={getFocusStoryWrightSteps}>{story()}</StoryWright>,
    story => <StoryWright steps={getHoverStoryWrightSteps}>{story()}</StoryWright>,
  ],
} as ComponentMeta<typeof Alert>;

const AlertExampleDangerTeams = getThemeStoryVariant(AlertExampleDanger, 'teamsV2');

const AlertExampleDangerTeamsDark = getThemeStoryVariant(AlertExampleDanger, 'teamsDarkV2');

const AlertExampleDangerTeamsHighContrast = getThemeStoryVariant(AlertExampleDanger, 'teamsHighContrast');

export {
  AlertExampleDanger,
  AlertExampleDangerTeams,
  AlertExampleDangerTeamsDark,
  AlertExampleDangerTeamsHighContrast,
};
