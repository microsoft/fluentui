import { ComponentMeta } from '@storybook/react';
import { Divider } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import DividerExampleColor from '../../examples/components/Divider/Variations/DividerExampleColor.shorthand';

export default {
  component: Divider,
  title: 'Divider',
} as ComponentMeta<typeof Divider>;

const DividerExampleColorTeams = getThemeStoryVariant(DividerExampleColor, 'teamsV2');

const DividerExampleColorTeamsDark = getThemeStoryVariant(DividerExampleColor, 'teamsDarkV2');

const DividerExampleColorTeamsHighContrast = getThemeStoryVariant(DividerExampleColor, 'teamsHighContrast');

export {
  DividerExampleColor,
  DividerExampleColorTeams,
  DividerExampleColorTeamsDark,
  DividerExampleColorTeamsHighContrast,
};
