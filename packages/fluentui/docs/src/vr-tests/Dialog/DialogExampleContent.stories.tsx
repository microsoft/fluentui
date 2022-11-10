import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Dialog } from '@fluentui/react-northstar';
import screenerSteps from './commonScreenerSteps';
import { getThemeStoryVariant } from '../utilities';
import DialogExampleContent from '../../examples/components/Dialog/Content/DialogExampleContent.shorthand';

export default {
  component: Dialog,
  title: 'Dialog',
  decorators: [story => <Screener steps={screenerSteps}>{story()}</Screener>],
} as ComponentMeta<typeof Dialog>;

const DialogExampleContentTeams = getThemeStoryVariant(DialogExampleContent, 'teamsV2');

const DialogExampleContentTeamsDark = getThemeStoryVariant(DialogExampleContent, 'teamsDarkV2');

const DialogExampleContentTeamsHighContrast = getThemeStoryVariant(DialogExampleContent, 'teamsHighContrast');

export {
  DialogExampleContent,
  DialogExampleContentTeams,
  DialogExampleContentTeamsDark,
  DialogExampleContentTeamsHighContrast,
};
