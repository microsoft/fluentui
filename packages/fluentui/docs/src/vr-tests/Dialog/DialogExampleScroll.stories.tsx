import * as React from 'react';
import { StoryWright } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Dialog } from '@fluentui/react-northstar';
import StoryWrightSteps from './commonStoryWrightSteps';
import { getThemeStoryVariant } from '../utilities';
import DialogExampleScroll from '../../examples/components/Dialog/Variations/DialogExampleScroll.shorthand';

export default {
  component: Dialog,
  title: 'Dialog',
  decorators: [story => <StoryWright steps={StoryWrightSteps}>{story()}</StoryWright>],
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
