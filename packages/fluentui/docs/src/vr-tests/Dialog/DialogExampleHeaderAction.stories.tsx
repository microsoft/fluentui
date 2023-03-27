import * as React from 'react';
import { StoryWright } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Dialog } from '@fluentui/react-northstar';
import StoryWrightSteps from './commonStoryWrightSteps';
import { getThemeStoryVariant } from '../utilities';
import DialogExampleHeaderAction from '../../examples/components/Dialog/Content/DialogExampleHeaderAction.shorthand';

export default {
  component: Dialog,
  title: 'Dialog',
  decorators: [story => <StoryWright steps={StoryWrightSteps}>{story()}</StoryWright>],
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
