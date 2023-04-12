import { ComponentMeta } from '@storybook/react';
import { SvgIcon } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import SvgconExampleBordered from '../../examples/components/SvgIcon/Variations/SvgIconExampleBordered.shorthand';

export default {
  component: SvgIcon,
  title: 'SvgIcon',
} as ComponentMeta<typeof SvgIcon>;

const SvgconExampleBorderedTeams = getThemeStoryVariant(SvgconExampleBordered, 'teamsV2');

const SvgconExampleBorderedTeamsDark = getThemeStoryVariant(SvgconExampleBordered, 'teamsDarkV2');

const SvgconExampleBorderedTeamsHighContrast = getThemeStoryVariant(SvgconExampleBordered, 'teamsHighContrast');

export {
  SvgconExampleBordered,
  SvgconExampleBorderedTeams,
  SvgconExampleBorderedTeamsDark,
  SvgconExampleBorderedTeamsHighContrast,
};
