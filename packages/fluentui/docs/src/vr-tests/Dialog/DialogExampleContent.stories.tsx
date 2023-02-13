import * as React from 'react';
import { StoryWright } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Dialog } from '@fluentui/react-northstar';
import StoryWrightSteps from './commonStoryWrightSteps';
import { getThemeStoryVariant } from '../utilities';
import DialogExampleContent from '../../examples/components/Dialog/Content/DialogExampleContent.shorthand';

export default {
  component: Dialog,
  title: 'Dialog',
  decorators: [story => <StoryWright steps={StoryWrightSteps}>{story()}</StoryWright>],
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
