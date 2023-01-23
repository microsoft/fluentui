import * as React from 'react';
import { Keys, StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Toolbar } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import ToolbarExampleEditorShorthand from '../../examples/components/Toolbar/Types/ToolbarExampleEditor.shorthand';

export default {
  component: Toolbar,
  title: 'Toolbar',
  decorators: [
    story => (
      <StoryWright steps={new Steps().keys('body', Keys.tab).snapshot('Focuses item').end()}>{story()}</StoryWright>
    ),
  ],
} as ComponentMeta<typeof Toolbar>;

const ToolbarExampleEditorShorthandTeams = getThemeStoryVariant(ToolbarExampleEditorShorthand, 'teamsV2');

const ToolbarExampleEditorShorthandTeamsDark = getThemeStoryVariant(ToolbarExampleEditorShorthand, 'teamsDarkV2');

const ToolbarExampleEditorShorthandTeamsHighContrast = getThemeStoryVariant(
  ToolbarExampleEditorShorthand,
  'teamsHighContrast',
);

export {
  ToolbarExampleEditorShorthand,
  ToolbarExampleEditorShorthandTeams,
  ToolbarExampleEditorShorthandTeamsDark,
  ToolbarExampleEditorShorthandTeamsHighContrast,
};
