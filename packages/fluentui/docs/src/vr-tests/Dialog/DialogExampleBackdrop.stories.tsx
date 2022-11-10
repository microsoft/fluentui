import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Dialog } from '@fluentui/react-northstar';
import screenerSteps from './commonScreenerSteps';
import { getThemeStoryVariant } from '../utilities';
import DialogExampleBackdrop from '../../examples/components/Dialog/Variations/DialogExampleBackdrop.shorthand';

export default {
  component: Dialog,
  title: 'Dialog',
  decorators: [story => <Screener steps={screenerSteps}>{story()}</Screener>],
} as ComponentMeta<typeof Dialog>;

const DialogExampleBackdropTeams = getThemeStoryVariant(DialogExampleBackdrop, 'teamsV2');

const DialogExampleBackdropTeamsDark = getThemeStoryVariant(DialogExampleBackdrop, 'teamsDarkV2');

const DialogExampleBackdropTeamsHighContrast = getThemeStoryVariant(DialogExampleBackdrop, 'teamsHighContrast');

export {
  DialogExampleBackdrop,
  DialogExampleBackdropTeams,
  DialogExampleBackdropTeamsDark,
  DialogExampleBackdropTeamsHighContrast,
};
