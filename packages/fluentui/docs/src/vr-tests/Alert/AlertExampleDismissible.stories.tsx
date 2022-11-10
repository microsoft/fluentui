import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Alert } from '@fluentui/react-northstar';
import { getFocusScreenerSteps, getHoverScreenerSteps } from './commonScreenerSteps';
import { getThemeStoryVariant } from '../utilities/getThemeStoryVariant';
import AlertExampleDismissible from '../../examples/components/Alert/Types/AlertExampleDismissible.shorthand';

export default {
  component: Alert,
  title: 'Alert',
  decorators: [
    story => <Screener steps={getFocusScreenerSteps}>{story()}</Screener>,
    story => <Screener steps={getHoverScreenerSteps}>{story()}</Screener>,
  ],
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
