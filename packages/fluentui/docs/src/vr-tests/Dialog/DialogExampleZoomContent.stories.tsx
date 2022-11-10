import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Dialog } from '@fluentui/react-northstar';
import screenerSteps from './commonScreenerSteps';
import { getThemeStoryVariant } from '../utilities';
import DialogExampleZoomContent from '../../examples/components/Dialog/Content/DialogExampleZoomCustomFooter.shorthand';

export default {
  component: Dialog,
  title: 'Dialog',
  decorators: [story => <Screener steps={screenerSteps}>{story()}</Screener>],
} as ComponentMeta<typeof Dialog>;

const DialogExampleZoomContentTeams = getThemeStoryVariant(DialogExampleZoomContent, 'teamsV2');

const DialogExampleZoomContentTeamsDark = getThemeStoryVariant(DialogExampleZoomContent, 'teamsDarkV2');

const DialogExampleZoomContentTeamsHighContrast = getThemeStoryVariant(DialogExampleZoomContent, 'teamsHighContrast');

export {
  DialogExampleZoomContent,
  DialogExampleZoomContentTeams,
  DialogExampleZoomContentTeamsDark,
  DialogExampleZoomContentTeamsHighContrast,
};
