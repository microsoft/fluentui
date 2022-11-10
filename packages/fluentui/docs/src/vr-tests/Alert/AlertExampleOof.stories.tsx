import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Alert } from '@fluentui/react-northstar';
import { getFocusScreenerSteps, getHoverScreenerSteps } from './commonScreenerSteps';

import { getThemeStoryVariant } from '../utilities/getThemeStoryVariant';
import AlertExampleOof from '../../examples/components/Alert/Variations/AlertExampleOofs.shorthand';

export default {
  component: Alert,
  title: 'Alert',
  decorators: [
    story => <Screener steps={getFocusScreenerSteps}>{story()}</Screener>,
    story => <Screener steps={getHoverScreenerSteps}>{story()}</Screener>,
  ],
} as ComponentMeta<typeof Alert>;

const AlertTeams = getThemeStoryVariant(Alert, 'teamsV2');

const AlertTeamsDark = getThemeStoryVariant(Alert, 'teamsDarkV2');

const AlertTeamsHighContrast = getThemeStoryVariant(Alert, 'teamsHighContrast');

export { AlertTeams, AlertTeamsDark, AlertTeamsHighContrast, AlertExampleOof };
