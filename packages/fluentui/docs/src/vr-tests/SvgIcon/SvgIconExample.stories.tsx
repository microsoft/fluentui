import { ComponentMeta } from '@storybook/react';
import { SvgIcon } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import SvgIconExample from '../../examples/components/SvgIcon/Types/SvgIconExample.shorthand';

export default {
  component: SvgIcon,
  title: 'SvgIcon',
} as ComponentMeta<typeof SvgIcon>;

const SvgIconExampleTeams = getThemeStoryVariant(SvgIconExample, 'teamsV2');

const SvgIconExampleTeamsDark = getThemeStoryVariant(SvgIconExample, 'teamsDarkV2');

const SvgIconExampleTeamsHighContrast = getThemeStoryVariant(SvgIconExample, 'teamsHighContrast');

export { SvgIconExample, SvgIconExampleTeams, SvgIconExampleTeamsDark, SvgIconExampleTeamsHighContrast };
