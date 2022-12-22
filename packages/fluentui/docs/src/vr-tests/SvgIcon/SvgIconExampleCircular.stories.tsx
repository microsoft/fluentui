import { ComponentMeta } from '@storybook/react';
import { SvgIcon } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import SvgIconExampleCircular from '../../examples/components/SvgIcon/Variations/SvgIconExampleCircular.shorthand';

export default {
  component: SvgIcon,
  title: 'SvgIcon',
} as ComponentMeta<typeof SvgIcon>;

const SvgIconExampleCircularTeams = getThemeStoryVariant(SvgIconExampleCircular, 'teamsV2');

const SvgIconExampleCircularTeamsDark = getThemeStoryVariant(SvgIconExampleCircular, 'teamsDarkV2');

const SvgIconExampleCircularTeamsHighContrast = getThemeStoryVariant(SvgIconExampleCircular, 'teamsHighContrast');

export {
  SvgIconExampleCircular,
  SvgIconExampleCircularTeams,
  SvgIconExampleCircularTeamsDark,
  SvgIconExampleCircularTeamsHighContrast,
};
