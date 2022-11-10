// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Divider } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import DividerExampleSize from '../../examples/components/Divider/Variations/DividerExampleSize.shorthand';

export default {
  component: Divider,
  title: 'Divider',
} as ComponentMeta<typeof Divider>;

const DividerExampleSizeTeams = getThemeStoryVariant(DividerExampleSize, 'teamsV2');

const DividerExampleSizeTeamsDark = getThemeStoryVariant(DividerExampleSize, 'teamsDarkV2');

const DividerExampleSizeTeamsHighContrast = getThemeStoryVariant(DividerExampleSize, 'teamsHighContrast');

export {
  DividerExampleSize,
  DividerExampleSizeTeams,
  DividerExampleSizeTeamsDark,
  DividerExampleSizeTeamsHighContrast,
};
