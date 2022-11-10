import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Dialog } from '@fluentui/react-northstar';
import screenerSteps from './commonScreenerSteps';
import { getThemeStoryVariant } from '../utilities';
import DialogExampleScroll from '../../examples/components/Dialog/Variations/DialogExampleScroll.shorthand';

export default {
  component: Dialog,
  title: 'Dialog',
  decorators: [story => <Screener steps={screenerSteps}>{story()}</Screener>],
} as ComponentMeta<typeof Dialog>;

const DialogExampleScrollTeams = getThemeStoryVariant(DialogExampleScroll, 'teamsV2');

const DialogExampleScrollTeamsDark = getThemeStoryVariant(DialogExampleScroll, 'teamsDarkV2');

const DialogExampleScrollTeamsHighContrast = getThemeStoryVariant(DialogExampleScroll, 'teamsHighContrast');

export {
  DialogExampleScroll,
  DialogExampleScrollTeams,
  DialogExampleScrollTeamsDark,
  DialogExampleScrollTeamsHighContrast,
};
