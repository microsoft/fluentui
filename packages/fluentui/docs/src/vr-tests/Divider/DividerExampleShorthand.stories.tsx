import { ComponentMeta } from '@storybook/react';
import { Divider } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import DividerExampleShorthand from '../../examples/components/Divider/Types/DividerExample.shorthand';

export default {
  component: Divider,
  title: 'Divider',
} as ComponentMeta<typeof Divider>;

const DividerExampleShorthandTeams = getThemeStoryVariant(DividerExampleShorthand, 'teamsV2');

const DividerExampleShorthandTeamsDark = getThemeStoryVariant(DividerExampleShorthand, 'teamsDarkV2');

const DividerExampleShorthandTeamsHighContrast = getThemeStoryVariant(DividerExampleShorthand, 'teamsHighContrast');

export {
  DividerExampleShorthand,
  DividerExampleShorthandTeams,
  DividerExampleShorthandTeamsDark,
  DividerExampleShorthandTeamsHighContrast,
};
