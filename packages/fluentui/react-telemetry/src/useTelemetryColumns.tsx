import * as _ from 'lodash';
import * as React from 'react';
import { CellProps, Column, FilterProps, HeaderProps, UseFiltersColumnProps } from 'react-table';

import * as styles from './styles';
import { TelemetryDataTotals } from './useTelemetryData';

const TelemetryTableFilter: React.FC<FilterProps<{}> & { column: UseFiltersColumnProps<{}> }> = ({ column }) => {
  const { filterValue, setFilter } = column;

  return (
    <input
      onChange={e => setFilter(e.target.value || undefined)}
      placeholder="Search by name..."
      style={styles.tableFilter()}
      value={filterValue || ''}
    />
  );
};

const TelemetryTableRoundingCell: React.FC<CellProps<{}>> = ({ value }) => <>{_.round(value, 2)}</>;

const TelemetryTableRoundingFooter: React.FC<HeaderProps<{}> & { totals: TelemetryDataTotals }> = ({
  column,
  totals,
}) => <>{_.round(totals[column.id as keyof TelemetryDataTotals], 2)}</>;

export function useTelemetryColumns(showDetails: boolean): Column[] {
  return React.useMemo(
    () =>
      [
        // Components

        {
          Header: 'Components',
          columns: [
            {
              Header: 'Component',
              Filter: TelemetryTableFilter,
              Footer: () => <b>Totals</b>,

              accessor: 'componentName',
              disableSortBy: true,
              filter: 'text',
            },
            {
              Header: 'Instances',
              Footer: TelemetryTableRoundingFooter,

              accessor: 'instances',
              disableFilters: true,
            },
            {
              Header: 'Renders',
              Footer: TelemetryTableRoundingFooter,

              accessor: 'renders',
              disableFilters: true,
            },
          ],
        },

        // Timers

        {
          Header: 'Render timers',
          columns: [
            {
              Cell: TelemetryTableRoundingCell,
              Header: 'Total',
              Footer: TelemetryTableRoundingFooter,

              accessor: 'msTotal',
              disableFilters: true,
              showPercentage: true,
            },
            {
              Cell: TelemetryTableRoundingCell,
              Header: 'Styles',
              Footer: TelemetryTableRoundingFooter,

              accessor: 'msStylesTotal',
              disableFilters: true,
              isShowStyleDetails: true,
              showPercentage: true,
            },

            showDetails && {
              Cell: TelemetryTableRoundingCell,
              Header: 'Variables',
              Footer: TelemetryTableRoundingFooter,

              accessor: 'msResolveVariablesTotal',
              disableFilters: true,
            },
            showDetails && {
              Cell: TelemetryTableRoundingCell,
              Header: 'Styles',
              Footer: TelemetryTableRoundingFooter,

              accessor: 'msResolveStylesTotal',
              disableFilters: true,
            },
            showDetails && {
              Cell: TelemetryTableRoundingCell,
              Header: 'Fela',
              Footer: TelemetryTableRoundingFooter,

              accessor: 'msRenderStylesTotal',
              disableFilters: true,
            },
          ].filter(Boolean),
        },

        // Cache

        {
          Header: 'Cache hits',
          columns: [
            {
              Header: 'root',
              accessor: 'stylesRootCacheHits',

              disableFilters: true,
            },
            {
              Header: 'slots',
              accessor: 'stylesSlotsCacheHits',

              disableFilters: true,
            },
          ],
        },
      ].filter(Boolean) as Column[],
    [showDetails],
  );
}
