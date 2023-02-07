import * as React from 'react';
import { StoryWright } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Dialog } from '@fluentui/react-northstar';
import StoryWrightSteps from './commonStoryWrightSteps';
import { getThemeStoryVariant } from '../utilities';
import DialogExampleZoomContent from '../../examples/components/Dialog/Content/DialogExampleZoomCustomFooter.shorthand';

export default {
  component: Dialog,
  title: 'Dialog',
  decorators: [story => <StoryWright steps={StoryWrightSteps}>{story()}</StoryWright>],
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
