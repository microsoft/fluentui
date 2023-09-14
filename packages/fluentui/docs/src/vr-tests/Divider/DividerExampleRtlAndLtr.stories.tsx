import { ComponentMeta } from '@storybook/react';
import { Divider } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import DividerExampleRtlAndLtr from '../../examples/components/Divider/Visuals/DividerExampleRtlAndLtr';

export default {
  component: Divider,
  title: 'Divider',
} as ComponentMeta<typeof Divider>;

const DividerExampleRtlAndLtrTeams = getThemeStoryVariant(DividerExampleRtlAndLtr, 'teamsV2');

const DividerExampleRtlAndLtrTeamsDark = getThemeStoryVariant(DividerExampleRtlAndLtr, 'teamsDarkV2');

const DividerExampleRtlAndLtrTeamsHighContrast = getThemeStoryVariant(DividerExampleRtlAndLtr, 'teamsHighContrast');

export {
  DividerExampleRtlAndLtr,
  DividerExampleRtlAndLtrTeams,
  DividerExampleRtlAndLtrTeamsDark,
  DividerExampleRtlAndLtrTeamsHighContrast,
};
