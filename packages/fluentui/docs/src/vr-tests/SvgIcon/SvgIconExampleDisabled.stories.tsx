import { ComponentMeta } from '@storybook/react';
import { SvgIcon } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import SvgIconExampleDisabled from '../../examples/components/SvgIcon/States/SvgIconExampleDisabled.shorthand';

export default {
  component: SvgIcon,
  title: 'SvgIcon',
} as ComponentMeta<typeof SvgIcon>;

const SvgIconExampleDisabledTeams = getThemeStoryVariant(SvgIconExampleDisabled, 'teamsV2');

const SvgIconExampleDisabledTeamsDark = getThemeStoryVariant(SvgIconExampleDisabled, 'teamsDarkV2');

const SvgIconExampleDisabledTeamsHighContrast = getThemeStoryVariant(SvgIconExampleDisabled, 'teamsHighContrast');

export {
  SvgIconExampleDisabled,
  SvgIconExampleDisabledTeams,
  SvgIconExampleDisabledTeamsDark,
  SvgIconExampleDisabledTeamsHighContrast,
};
