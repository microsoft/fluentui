import * as _ from 'lodash';
import * as React from 'react';
import { CellProps, Column, FilterProps, HeaderProps, UseFiltersColumnProps } from 'react-table';

import * as styles from './styles';
import { TelemetryDataTotals } from './useTelemetryData';

export type CellAlign = 'left' | 'right' | 'center';

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

const TelemetryTableRoundingCell: React.FC<CellProps<{}>> = ({ value }) => <>{_.round(value, 2).toFixed(2)}</>;

const TelemetryTableRoundingFooter: React.FC<HeaderProps<{}> & { totals: TelemetryDataTotals }> = ({
  column,
  totals,
}) => <>{_.round(totals[column.id as keyof TelemetryDataTotals], 2).toFixed(2)}</>;

const TelemetryTableSumFooter: React.FC<HeaderProps<{}> & { totals: TelemetryDataTotals }> = ({ column, totals }) => (
  <>{totals[column.id as keyof TelemetryDataTotals]}</>
);

export function useTelemetryColumns({
  showStylesDetails,
  showTotalDetails,
}: {
  showStylesDetails: boolean;
  showTotalDetails: boolean;
}): Column[] {
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
              Footer: 'Totals',

              accessor: 'componentName',
              align: 'left',
              filter: 'text',
            },
            {
              Header: 'Instances',
              Footer: TelemetryTableSumFooter,

              accessor: 'instances',
              disableFilters: true,
            },
            {
              Header: 'Renders',
              Footer: TelemetryTableSumFooter,

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
              isShowDetails: 'total',
              showPercentage: true,
              sortType: 'basic',
              subgroup: 'timers',
            },
            showTotalDetails && {
              Cell: TelemetryTableRoundingCell,
              Header: 'Min',
              Footer: TelemetryTableRoundingFooter,

              accessor: 'msMin',
              disableFilters: true,
              sortType: 'basic',
              subgroup: 'timers',
            },
            showTotalDetails && {
              Cell: TelemetryTableRoundingCell,
              Header: 'Max',
              Footer: TelemetryTableRoundingFooter,

              accessor: 'msMax',
              disableFilters: true,
              sortType: 'basic',
              subgroup: 'timers',
            },
            showTotalDetails && {
              Cell: TelemetryTableRoundingCell,
              Header: 'Avg',
              Footer: TelemetryTableRoundingFooter,

              accessor: 'msAvg',
              disableFilters: true,
              sortType: 'basic',
              subgroup: 'timers',
            },
            {
              Cell: TelemetryTableRoundingCell,
              Header: 'Styles',
              Footer: TelemetryTableRoundingFooter,

              accessor: 'msStylesTotal',
              disableFilters: true,
              isShowDetails: 'styles',
              showPercentage: true,
              sortType: 'basic',
              subgroup: 'styles',
            },

            showStylesDetails && {
              Cell: TelemetryTableRoundingCell,
              Header: <span title="Merge component variables, resolve them with  site variables">Variables</span>,
              Footer: TelemetryTableRoundingFooter,

              accessor: 'msResolveVariablesTotal',
              disableFilters: true,
              sortType: 'basic',
              subgroup: 'styles',
            },
            showStylesDetails && {
              Cell: TelemetryTableRoundingCell,
              Header: <span title="Merge style objects, resolve them with variables">Merge</span>,
              Footer: TelemetryTableRoundingFooter,

              accessor: 'msResolveStylesTotal',
              disableFilters: true,
              sortType: 'basic',
              subgroup: 'styles',
            },
            showStylesDetails && {
              Cell: TelemetryTableRoundingCell,
              Header: (
                <span title="Process style objects with CSSInJS plugins, generate CSS classes, inject styles into DOM">
                  CSS
                </span>
              ),
              Footer: TelemetryTableRoundingFooter,

              accessor: 'msRenderStylesTotal',
              disableFilters: true,
              sortType: 'basic',
              subgroup: 'styles',
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
    [showStylesDetails, showTotalDetails],
  );
}
