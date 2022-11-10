import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Alert } from '@fluentui/react-northstar';
import { getFocusScreenerSteps, getHoverScreenerSteps } from './commonScreenerSteps';
import { getThemeStoryVariant } from '../utilities/getThemeStoryVariant';
import AlertExampleDanger from '../../examples/components/Alert/Variations/AlertExampleDanger.shorthand';

export default {
  component: Alert,
  title: 'Alert',
  decorators: [
    story => <Screener steps={getFocusScreenerSteps}>{story()}</Screener>,
    story => <Screener steps={getHoverScreenerSteps}>{story()}</Screener>,
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
