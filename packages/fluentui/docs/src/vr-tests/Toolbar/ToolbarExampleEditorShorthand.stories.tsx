import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Toolbar } from '@fluentui/react-northstar';
import { getThemeStoryVariant, keys } from '../utilities';
import ToolbarExampleEditorShorthand from '../../examples/components/Toolbar/Types/ToolbarExampleEditor.shorthand';

export default {
  component: Toolbar,
  title: 'Toolbar',
  decorators: [
    story => <Screener steps={new Steps().keys('body', keys.tab).snapshot('Focuses item').end()}>{story()}</Screener>,
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
