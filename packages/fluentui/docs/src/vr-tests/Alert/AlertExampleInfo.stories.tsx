import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Alert } from '@fluentui/react-northstar';
import { getFocusScreenerSteps, getHoverScreenerSteps } from './commonScreenerSteps';
import { getThemeStoryVariant } from '../utilities/getThemeStoryVariant';
import AlertExampleInfo from '../../examples/components/Alert/Variations/AlertExampleInfo.shorthand';

export default {
  component: Alert,
  title: 'Alert',
  decorators: [
    story => <Screener steps={getFocusScreenerSteps}>{story()}</Screener>,
    story => <Screener steps={getHoverScreenerSteps}>{story()}</Screener>,
  ],
} as ComponentMeta<typeof Alert>;

const AlertExampleInfoTeams = getThemeStoryVariant(AlertExampleInfo, 'teamsV2');

const AlertExampleInfoTeamsDark = getThemeStoryVariant(AlertExampleInfo, 'teamsDarkV2');

const AlertExampleInfoTeamsHighContrast = getThemeStoryVariant(AlertExampleInfo, 'teamsHighContrast');

export { AlertExampleInfo, AlertExampleInfoTeams, AlertExampleInfoTeamsDark, AlertExampleInfoTeamsHighContrast };
