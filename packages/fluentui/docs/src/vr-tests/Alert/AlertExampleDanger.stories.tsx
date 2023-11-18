import { ComponentMeta } from '@storybook/react';
import { Alert } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities/getThemeStoryVariant';
import AlertExampleDanger from '../../examples/components/Alert/Variations/AlertExampleDanger.shorthand';

export default {
  component: Alert,
  title: 'Alert',
} as ComponentMeta<typeof Alert>;

const AlertExampleDangerTeams = getThemeStoryVariant(AlertExampleDanger, 'teamsV2');

const AlertExampleDangerTeamsDark = getThemeStoryVariant(AlertExampleDanger, 'teamsDarkV2');

const AlertExampleDangerTeamsHighContrast = getThemeStoryVariant(AlertExampleDanger, 'teamsHighContrast');

export {
  AlertExampleDanger,
  AlertExampleDangerTeams,
  AlertExampleDangerTeamsDark,
  AlertExampleDangerTeamsHighContrast,
};
