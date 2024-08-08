import { Meta } from '@storybook/react';
import { SvgIcon } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import SvgIconSetExampleShorthand from '../../examples/components/SvgIcon/Usage/SvgIconSetExample.shorthand';

export default {
  component: SvgIcon,
  title: 'SvgIcon',
} as Meta<typeof SvgIcon>;

const SvgIconSetExampleShorthandTeams = getThemeStoryVariant(SvgIconSetExampleShorthand, 'teamsV2');

const SvgIconSetExampleShorthandTeamsDark = getThemeStoryVariant(SvgIconSetExampleShorthand, 'teamsDarkV2');

const SvgIconSetExampleShorthandTeamsHighContrast = getThemeStoryVariant(
  SvgIconSetExampleShorthand,
  'teamsHighContrast',
);

export {
  SvgIconSetExampleShorthand,
  SvgIconSetExampleShorthandTeams,
  SvgIconSetExampleShorthandTeamsDark,
  SvgIconSetExampleShorthandTeamsHighContrast,
};
