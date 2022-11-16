import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { StoryWright } from 'storywright';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Alert } from '@fluentui/react-northstar';
import { getFocusStoryWrightSteps, getHoverStoryWrightSteps } from './commonStoryWrightSteps';
import { getThemeStoryVariant } from '../utilities/getThemeStoryVariant';
import AlertExampleInfo from '../../examples/components/Alert/Variations/AlertExampleInfo.shorthand';

export default {
  component: Alert,
  title: 'Alert',
  decorators: [
    story => <StoryWright steps={getFocusStoryWrightSteps}>{story()}</StoryWright>,
    story => <StoryWright steps={getHoverStoryWrightSteps}>{story()}</StoryWright>,
  ],
} as ComponentMeta<typeof Alert>;

const AlertExampleInfoTeams = getThemeStoryVariant(AlertExampleInfo, 'teamsV2');

const AlertExampleInfoTeamsDark = getThemeStoryVariant(AlertExampleInfo, 'teamsDarkV2');

const AlertExampleInfoTeamsHighContrast = getThemeStoryVariant(AlertExampleInfo, 'teamsHighContrast');

export { AlertExampleInfo, AlertExampleInfoTeams, AlertExampleInfoTeamsDark, AlertExampleInfoTeamsHighContrast };
