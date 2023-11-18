import { ComponentMeta } from '@storybook/react';
import { Alert } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities/getThemeStoryVariant';
import AlertExampleInfo from '../../examples/components/Alert/Variations/AlertExampleInfo.shorthand';

export default {
  component: Alert,
  title: 'Alert',
} as ComponentMeta<typeof Alert>;

const AlertExampleInfoTeams = getThemeStoryVariant(AlertExampleInfo, 'teamsV2');

const AlertExampleInfoTeamsDark = getThemeStoryVariant(AlertExampleInfo, 'teamsDarkV2');

const AlertExampleInfoTeamsHighContrast = getThemeStoryVariant(AlertExampleInfo, 'teamsHighContrast');

export { AlertExampleInfo, AlertExampleInfoTeams, AlertExampleInfoTeamsDark, AlertExampleInfoTeamsHighContrast };
