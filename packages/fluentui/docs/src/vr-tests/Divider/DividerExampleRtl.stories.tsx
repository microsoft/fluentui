import { ComponentMeta } from '@storybook/react';
import { Divider } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import DividerExampleRtl from '../../examples/components/Divider/Rtl/DividerExample.rtl';

export default {
  component: Divider,
  title: 'Divider',
} as ComponentMeta<typeof Divider>;

const DividerExampleRtlTeams = getThemeStoryVariant(DividerExampleRtl, 'teamsV2');

const DividerExampleRtlTeamsDark = getThemeStoryVariant(DividerExampleRtl, 'teamsDarkV2');

const DividerExampleRtlTeamsHighContrast = getThemeStoryVariant(DividerExampleRtl, 'teamsHighContrast');

export { DividerExampleRtl, DividerExampleRtlTeams, DividerExampleRtlTeamsDark, DividerExampleRtlTeamsHighContrast };
