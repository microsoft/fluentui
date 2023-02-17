import { ComponentMeta } from '@storybook/react';
import { Divider } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import DividerExampleFittedShorthand from '../../examples/components/Divider/Variations/DividerExampleFitted.shorthand';

export default {
  component: Divider,
  title: 'Divider',
} as ComponentMeta<typeof Divider>;

const DividerExampleFittedShorthandTeams = getThemeStoryVariant(DividerExampleFittedShorthand, 'teamsV2');

const DividerExampleFittedShorthandTeamsDark = getThemeStoryVariant(DividerExampleFittedShorthand, 'teamsDarkV2');

const DividerExampleFittedShorthandTeamsHighContrast = getThemeStoryVariant(
  DividerExampleFittedShorthand,
  'teamsHighContrast',
);

export {
  DividerExampleFittedShorthand,
  DividerExampleFittedShorthandTeams,
  DividerExampleFittedShorthandTeamsDark,
  DividerExampleFittedShorthandTeamsHighContrast,
};
