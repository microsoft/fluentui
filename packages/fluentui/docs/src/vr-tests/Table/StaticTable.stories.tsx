import { ComponentMeta } from '@storybook/react';
import { Table } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import StaticTable from '../../examples/components/Table/Usage/TableExampleNavigable.shorthand';

export default {
  component: Table,
  title: 'Table',
} as ComponentMeta<typeof Table>;

const StaticTableTeams = getThemeStoryVariant(StaticTable, 'teamsV2');

const StaticTableTeamsDark = getThemeStoryVariant(StaticTable, 'teamsDarkV2');

const StaticTableTeamsHighContrast = getThemeStoryVariant(StaticTable, 'teamsHighContrast');

export { StaticTable, StaticTableTeams, StaticTableTeamsDark, StaticTableTeamsHighContrast };
