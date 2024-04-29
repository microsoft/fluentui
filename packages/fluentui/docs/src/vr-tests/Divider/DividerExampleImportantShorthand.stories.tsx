import { ComponentMeta } from '@storybook/react';
import { Divider } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import DividerExampleImportantShorthand from '../../examples/components/Divider/Variations/DividerExampleImportant.shorthand';

export default {
  component: Divider,
  title: 'Divider',
} as ComponentMeta<typeof Divider>;

const DividerExampleImportantShorthandTeams = getThemeStoryVariant(DividerExampleImportantShorthand, 'teamsV2');

const DividerExampleImportantShorthandTeamsDark = getThemeStoryVariant(DividerExampleImportantShorthand, 'teamsDarkV2');

const DividerExampleImportantShorthandTeamsHighContrast = getThemeStoryVariant(
  DividerExampleImportantShorthand,
  'teamsHighContrast',
);

export {
  DividerExampleImportantShorthand,
  DividerExampleImportantShorthandTeams,
  DividerExampleImportantShorthandTeamsDark,
  DividerExampleImportantShorthandTeamsHighContrast,
};
