import { ComponentMeta } from '@storybook/react';
import { Status } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import StatusTypeExampleShorthand from '../../examples/components/Status/Types/StatusTypeExample.shorthand';

export default {
  component: Status,
  title: 'Status',
} as ComponentMeta<typeof Status>;

const StatusTypeExampleShorthandTeams = getThemeStoryVariant(StatusTypeExampleShorthand, 'teamsV2');

const StatusTypeExampleShorthandTeamsDark = getThemeStoryVariant(StatusTypeExampleShorthand, 'teamsDarkV2');

const StatusTypeExampleShorthandTeamsHighContrast = getThemeStoryVariant(
  StatusTypeExampleShorthand,
  'teamsHighContrast',
);

export {
  StatusTypeExampleShorthand,
  StatusTypeExampleShorthandTeams,
  StatusTypeExampleShorthandTeamsDark,
  StatusTypeExampleShorthandTeamsHighContrast,
};
