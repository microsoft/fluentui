import { ComponentMeta } from '@storybook/react';
import { Toolbar } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import ToolbarExampleRadioGroupShorthand from '../../examples/components/Toolbar/Content/ToolbarExampleRadioGroup.shorthand';

export default {
  component: Toolbar,
  title: 'Toolbar',
} as ComponentMeta<typeof Toolbar>;

const ToolbarExampleRadioGroupShorthandTeams = getThemeStoryVariant(ToolbarExampleRadioGroupShorthand, 'teamsV2');

const ToolbarExampleRadioGroupShorthandTeamsDark = getThemeStoryVariant(
  ToolbarExampleRadioGroupShorthand,
  'teamsDarkV2',
);

const ToolbarExampleRadioGroupShorthandTeamsHighContrast = getThemeStoryVariant(
  ToolbarExampleRadioGroupShorthand,
  'teamsHighContrast',
);

export {
  ToolbarExampleRadioGroupShorthand,
  ToolbarExampleRadioGroupShorthandTeams,
  ToolbarExampleRadioGroupShorthandTeamsDark,
  ToolbarExampleRadioGroupShorthandTeamsHighContrast,
};
