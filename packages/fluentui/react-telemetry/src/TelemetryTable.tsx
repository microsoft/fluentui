import { Telemetry } from '@fluentui/react-bindings';
import * as React from 'react';
import {
  Cell,
  HeaderGroup,
  Row,
  TableOptions,
  TableState,
  useFilters,
  UseFiltersColumnProps,
  usePagination,
  useSortBy,
  UseSortByColumnProps,
  UseSortByState,
  useTable,
} from 'react-table';

import * as styles from './styles';
import { useIntervalUpdate } from './useIntervalUpdate';
import { useTelemetryColumns, CellAlign } from './useTelemetryColumns';
import { TelemetryDataTotals, useTelemetryData } from './useTelemetryData';
import { TelemetryState, TelemetryTableExpandNames } from './useTelemetryState';

type TelemetryTableProps = {
  telemetry: Telemetry;

  componentFilter: TelemetryState['tableComponentFilter'];
  expand: TelemetryState['tableExpand'];
  sort: TelemetryState['tableSort'];

  onComponentFilterChange: (filter: string) => void;
  onExpandChange: (name: TelemetryTableExpandNames, show: boolean) => void;
  onSortChange: (sort: TelemetryState['tableSort'] | undefined) => void;
};

type TelemetryHeaderGroup = HeaderGroup &
  UseSortByColumnProps<{}> &
  UseFiltersColumnProps<{}> & {
    isShowDetails?: TelemetryTableExpandNames;
    subgroup: 'styles' | 'timers';
  };

export const TelemetryTable: React.FC<TelemetryTableProps> = props => {
  const { expand, componentFilter, sort, onComponentFilterChange, onExpandChange, onSortChange, telemetry } = props;

  const [interval, setInterval] = React.useState(2000);
  const tick = useIntervalUpdate(interval);

  const { data, totals } = useTelemetryData(telemetry, tick);
  const columns = useTelemetryColumns({ showStylesDetails: expand?.styles, showTotalDetails: expand?.total });

  const {
    getTableProps,
    getTableBodyProps,

    footerGroups,
    headerGroups,
    // @ts-ignore
    page,

    prepareRow,
    // @ts-ignore
    setPageSize,

    // @ts-ignore
    state: { pageSize },
  } = useTable(
    {
      columns,
      data,
      totals,

      autoResetFilters: false,
      autoResetPage: false,
      autoResetSortBy: false,
      disableMultiSort: true,

      initialState: {
        ...{ pageSize: 20 },
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
    usePagination,
  );

  return (
    <>
      <table {...getTableProps({ style: styles.table() })}>
        <thead>
          {headerGroups.map(group => (
            <tr {...group.getHeaderGroupProps()}>
              {group.headers.map((column: TelemetryHeaderGroup, index) => (
                <th
                  {...column.getHeaderProps({
                    style: styles.tableHeader({
                      isFirstInSubgroup:
                        column.subgroup &&
                        column.subgroup !== (group.headers[index - 1] as TelemetryHeaderGroup)?.subgroup,
                      isLastInSubgroup:
                        column.subgroup &&
                        column.subgroup !== (group.headers[index + 1] as TelemetryHeaderGroup)?.subgroup,
                      subgroup: column.subgroup,
                    }),
                  })}
                >
                  <div style={{ alignItems: 'center', display: 'flex' }}>
                    <div {...column.getSortByToggleProps({ style: { flex: 1 } })}>
                      {column.render('Header')}
                      <span style={styles.tableSort()}>
                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                      </span>
                    </div>
                    {column.isShowDetails && (
                      <input
                        checked={expand?.[column.isShowDetails]}
                        onChange={e => onExpandChange(column.isShowDetails!, e.target.checked)}
                        style={styles.tableCheckbox()}
                        type="checkbox"
                      />
                    )}
                    {column.canFilter && <div>{column.render('Filter')}</div>}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row: Row) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(
                  (
                    cell: Cell & {
                      column: UseSortByColumnProps<{}> & {
                        showPercentage?: boolean;
                        align?: CellAlign;
                      };
                    },
                  ) => (
                    <td
                      {...cell.getCellProps({
                        style: styles.tableCell({
                          align: cell.column.align,
                          percentageRatio: cell.column.showPercentage
                            ? cell.value / totals[cell.column.id as keyof TelemetryDataTotals]
                            : undefined,
                        }),
                      })}
                    >
                      {cell.render('Cell')}
                    </td>
                  ),
                )}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map(group => (
            <tr {...group.getFooterGroupProps()}>
              {group.headers.find((header: HeaderGroup & { Footer: React.ReactElement }) => header.Footer) &&
                group.headers.map((column: HeaderGroup & { align?: CellAlign }) => (
                  <td {...column.getFooterProps({ style: styles.tableFooterCell({ align: column.align }) })}>
                    {column.render('Footer')}
                  </td>
                ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div style={styles.tableControls()}>
        <div style={{ alignItems: 'center' }}>
          <input
            defaultChecked={telemetry.enabled}
            type="checkbox"
            id="telemetry-control"
            onChange={e => (telemetry.enabled = e.target.checked)}
          />
          <label htmlFor="telemetry-control" style={{ marginLeft: 5 }}>
            Collect telemetry
          </label>
        </div>
        <button onClick={() => telemetry.reset()} style={{ marginLeft: 10 }}>
          Clear data
        </button>
        <div>
          <label>Table refresh time</label>
          <select onChange={e => setInterval(Number(e.target.value))} style={{ marginLeft: 5 }} value={interval}>
            <option value="500">500ms</option>
            <option value="1000">1s</option>
            <option value="2000">2s</option>
            <option value="5000">5s</option>
          </select>
        </div>
        <span>Total: {data.length} component(s)</span>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 50, 100].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
