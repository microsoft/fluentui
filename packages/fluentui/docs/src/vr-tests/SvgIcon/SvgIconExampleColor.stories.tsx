import { ComponentMeta } from '@storybook/react';
import { SvgIcon } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import SvgIconExampleColor from '../../examples/components/SvgIcon/Variations/SvgIconExampleColor.shorthand';

export default {
  component: SvgIcon,
  title: 'SvgIcon',
} as ComponentMeta<typeof SvgIcon>;

const SvgIconExampleColorTeams = getThemeStoryVariant(SvgIconExampleColor, 'teamsV2');

const SvgIconExampleColorTeamsDark = getThemeStoryVariant(SvgIconExampleColor, 'teamsDarkV2');

const SvgIconExampleColorTeamsHighContrast = getThemeStoryVariant(SvgIconExampleColor, 'teamsHighContrast');

export {
  SvgIconExampleColor,
  SvgIconExampleColorTeams,
  SvgIconExampleColorTeamsDark,
  SvgIconExampleColorTeamsHighContrast,
};
