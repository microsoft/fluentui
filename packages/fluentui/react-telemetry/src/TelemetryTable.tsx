import { Telemetry } from '@fluentui/react-bindings';
import * as React from 'react';
import {
  Cell,
  HeaderGroup,
  TableOptions,
  TableState,
  useFilters,
  UseFiltersColumnProps,
  useSortBy,
  UseSortByColumnProps,
  UseSortByState,
  useTable,
} from 'react-table';

import * as styles from './styles';
import { useIntervalUpdate } from './useIntervalUpdate';
import { useTelemetryColumns } from './useTelemetryColumns';
import { TelemetryDataTotals, useTelemetryData } from './useTelemetryData';
import { TelemetryState } from './useTelemetryState';

type TelemetryTableProps = {
  telemetry: Telemetry;

  componentFilter: TelemetryState['tableComponentFilter'];
  expandStyles: TelemetryState['tableExpandStyles'];
  sort: TelemetryState['tableSort'];

  onComponentFilterChange: (filter: string) => void;
  onExpandStylesChange: (show: boolean) => void;
  onSortChange: (sort: TelemetryState['tableSort'] | undefined) => void;
};

export const TelemetryTable: React.FC<TelemetryTableProps> = props => {
  const {
    expandStyles,
    componentFilter,
    sort,
    onComponentFilterChange,
    onExpandStylesChange,
    onSortChange,
    telemetry,
  } = props;

  const tick = useIntervalUpdate();
  const { data, totals } = useTelemetryData(telemetry, tick);
  const columns = useTelemetryColumns(expandStyles);

  const { getTableProps, getTableBodyProps, footerGroups, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      totals,

      autoResetFilters: false,
      autoResetSortBy: false,
      disableMultiSort: true,

      initialState: {
        ...(componentFilter && { filters: [{ id: 'componentName', value: componentFilter }] }),
        ...(sort && { sortBy: [{ id: sort.column, desc: sort.direction === 'desc' }] }),
      } as Partial<TableState>,
      stateReducer: (newState: TableState & UseSortByState<{}>, action) => {
        if (action.type === 'setFilter' && action.columnId === 'componentName') {
          onComponentFilterChange(action.filterValue);
        }

        if (action.type === 'toggleSortBy') {
          if (newState.sortBy.length > 0) {
            onSortChange({
              column: action.columnId,
              direction: newState.sortBy[0].desc ? 'desc' : 'asc',
            });
          } else {
            onSortChange(undefined);
          }
        }

        return newState;
      },
    } as TableOptions<{}>,
    useFilters,
    useSortBy,
  );

  return (
    <table {...getTableProps({ style: styles.table() })}>
      <thead>
        {headerGroups.map(group => (
          <tr {...group.getHeaderGroupProps()}>
            {group.headers.map(
              (
                column: HeaderGroup &
                  UseSortByColumnProps<{}> &
                  UseFiltersColumnProps<{}> & { isShowStyleDetails?: boolean },
              ) => (
                <th
                  {...column.getHeaderProps({
                    style: styles.tableHeader({
                      canFilter: column.canFilter,
                      isShowStyleDetails: column.isShowStyleDetails,
                    }),
                  })}
                >
                  <div {...column.getSortByToggleProps()}>
                    {column.render('Header')}
                    <span style={styles.tableSort()}>
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                    </span>
                  </div>
                  {column.isShowStyleDetails && (
                    <input
                      checked={expandStyles}
                      onChange={e => onExpandStylesChange(e.target.checked)}
                      style={styles.tableCheckbox()}
                      type="checkbox"
                    />
                  )}
                  {column.canFilter && <div>{column.render('Filter')}</div>}
                </th>
              ),
            )}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);

          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell: Cell & { column: UseSortByColumnProps<{}> & { showPercentage?: boolean } }) => (
                <td
                  {...cell.getCellProps({
                    style: styles.tableCell({
                      canSort: cell.column.canSort,
                      percentageRatio: cell.column.showPercentage
                        ? cell.value / totals[cell.column.id as keyof TelemetryDataTotals]
                        : undefined,
                    }),
                  })}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        {footerGroups.map(group => (
          <tr {...group.getFooterGroupProps()}>
            {group.headers.find((header: HeaderGroup & { Footer: React.ReactElement }) => header.Footer) &&
              group.headers.map(column => <td {...column.getFooterProps()}>{column.render('Footer')}</td>)}
          </tr>
        ))}
      </tfoot>
    </table>
  );
};
