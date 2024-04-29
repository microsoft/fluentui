import { ComponentMeta } from '@storybook/react';
import { SvgIcon } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import SvgIconExampleSpace from '../../examples/components/SvgIcon/Variations/SvgIconExampleSpace.shorthand';

export default {
  component: SvgIcon,
  title: 'SvgIcon',
} as ComponentMeta<typeof SvgIcon>;

const SvgIconExampleSpaceTeams = getThemeStoryVariant(SvgIconExampleSpace, 'teamsV2');

const SvgIconExampleSpaceTeamsDark = getThemeStoryVariant(SvgIconExampleSpace, 'teamsDarkV2');

const SvgIconExampleSpaceTeamsHighContrast = getThemeStoryVariant(SvgIconExampleSpace, 'teamsHighContrast');

export {
  SvgIconExampleSpace,
  SvgIconExampleSpaceTeams,
  SvgIconExampleSpaceTeamsDark,
  SvgIconExampleSpaceTeamsHighContrast,
};
