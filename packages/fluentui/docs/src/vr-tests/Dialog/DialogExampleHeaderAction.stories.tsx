import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Dialog } from '@fluentui/react-northstar';
import screenerSteps from './commonScreenerSteps';
import { getThemeStoryVariant } from '../utilities';
import DialogExampleHeaderAction from '../../examples/components/Dialog/Content/DialogExampleHeaderAction.shorthand';

export default {
  component: Dialog,
  title: 'Dialog',
  decorators: [story => <Screener steps={screenerSteps}>{story()}</Screener>],
} as ComponentMeta<typeof Dialog>;

const DialogExampleHeaderActionTeams = getThemeStoryVariant(DialogExampleHeaderAction, 'teamsV2');

const DialogExampleHeaderActionTeamsDark = getThemeStoryVariant(DialogExampleHeaderAction, 'teamsDarkV2');

const DialogExampleHeaderActionTeamsHighContrast = getThemeStoryVariant(DialogExampleHeaderAction, 'teamsHighContrast');

export {
  DialogExampleHeaderAction,
  DialogExampleHeaderActionTeams,
  DialogExampleHeaderActionTeamsDark,
  DialogExampleHeaderActionTeamsHighContrast,
};
