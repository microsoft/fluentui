import { ComponentMeta } from '@storybook/react';
import { SvgIcon } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import SvgIconExampleSize from '../../examples/components/SvgIcon/Variations/SvgIconExampleSize.shorthand';

export default {
  component: SvgIcon,
  title: 'SvgIcon',
} as ComponentMeta<typeof SvgIcon>;

const SvgIconExampleSizeTeams = getThemeStoryVariant(SvgIconExampleSize, 'teamsV2');

const SvgIconExampleSizeTeamsDark = getThemeStoryVariant(SvgIconExampleSize, 'teamsDarkV2');

const SvgIconExampleSizeTeamsHighContrast = getThemeStoryVariant(SvgIconExampleSize, 'teamsHighContrast');

export {
  SvgIconExampleSize,
  SvgIconExampleSizeTeams,
  SvgIconExampleSizeTeamsDark,
  SvgIconExampleSizeTeamsHighContrast,
};
