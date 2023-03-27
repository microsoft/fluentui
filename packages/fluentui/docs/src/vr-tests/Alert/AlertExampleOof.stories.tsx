import * as React from 'react';
import { StoryWright } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Alert } from '@fluentui/react-northstar';
import StoryWrightSteps from './commonStoryWrightSteps';

import { getThemeStoryVariant } from '../utilities/getThemeStoryVariant';
import AlertExampleOof from '../../examples/components/Alert/Variations/AlertExampleOofs.shorthand';

export default {
  component: Alert,
  title: 'Alert',
  decorators: [story => <StoryWright steps={StoryWrightSteps}>{story()}</StoryWright>],
} as ComponentMeta<typeof Alert>;

const AlertExampleOofTeams = getThemeStoryVariant(AlertExampleOof, 'teamsV2');

const AlertExampleOofTeamsDark = getThemeStoryVariant(AlertExampleOof, 'teamsDarkV2');

const AlertExampleOofTeamsHighContrast = getThemeStoryVariant(AlertExampleOof, 'teamsHighContrast');

export { AlertExampleOof, AlertExampleOofTeams, AlertExampleOofTeamsDark, AlertExampleOofTeamsHighContrast };
