import * as React from 'react';
import { StoryWright } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Dialog } from '@fluentui/react-northstar';
import StoryWrightSteps from './commonStoryWrightSteps';
import { getThemeStoryVariant } from '../utilities';
import DialogExampleBackdrop from '../../examples/components/Dialog/Variations/DialogExampleBackdrop.shorthand';

export default {
  component: Dialog,
  title: 'Dialog',
  decorators: [story => <StoryWright steps={StoryWrightSteps}>{story()}</StoryWright>],
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
