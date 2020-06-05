import * as _ from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { Provider, Debug, teamsTheme, teamsDarkTheme, teamsHighContrastTheme } from '@fluentui/react-northstar';

import { mergeThemes } from '@fluentui/styles';
import { ComponentPerfStats, defaultPerformanceFlags, StylesContextPerformance } from '@fluentui/react-bindings';
import { useTable, useSortBy, useFilters } from 'react-table';

import { ThemeContext, ThemeContextData, themeContextDefaults } from './context/ThemeContext';
import Routes from './routes';

// Experimental dev-time accessibility attributes integrity validation.
import { setup } from '@fluentui/ability-attributes';
import { Telemetry } from '@fluentui/react-bindings';

// Temporarily disabling the validation for Screener.
if (process.env.NODE_ENV !== 'production' && !process.env.SCREENER) {
  setup();
}

const themes = {
  teamsTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
};

type PerformanceAction =
  | {
      name: keyof StylesContextPerformance;
      type: 'FLAG';
      value: boolean;
    }
  | {
      type: 'STYLE_DETAILS';
      value: boolean;
    }
  | {
      type: 'COMPONENT_FILTER';
      value: string | undefined;
    }
  | {
      type: 'COLUMN_SORT';
      column: string;
      value: 'asc' | 'desc';
    };

type PerformanceState = {
  flags: StylesContextPerformance;
  filter: string | undefined;
  sort: { column: string; value: 'asc' | 'desc' } | undefined;
  styleDetails: boolean;
};

const stateReducer: React.Reducer<PerformanceState, PerformanceAction> = (prevState, action) => {
  switch (action.type) {
    case 'FLAG':
      return { ...prevState, flags: { ...prevState.flags, [action.name]: action.value } };
    case 'STYLE_DETAILS':
      return { ...prevState, styleDetails: action.value };
    case 'COMPONENT_FILTER':
      return { ...prevState, filter: action.value };
    case 'COLUMN_SORT':
      if (action.column) {
        return { ...prevState, sort: { column: action.column, value: action.value } };
      }

      return { ...prevState, sort: undefined };
    default:
      throw new Error('11111');
  }
};

const TelemetryGuardPerfFlags: React.FC<{
  flags: StylesContextPerformance;
  onChange: React.Dispatch<PerformanceAction>;
}> = props => (
  <div style={{ flex: 1 }}>
    {Object.keys(props.flags).map(flag => (
      <div key={flag} style={{ display: 'flex' }}>
        <input
          checked={props.flags[flag]}
          name={flag}
          type="checkbox"
          onChange={e =>
            props.onChange({
              name: e.target.name as keyof StylesContextPerformance,
              type: 'FLAG',
              value: e.target.checked,
            })
          }
        />
        <label style={{ paddingLeft: 5 }}>{flag}</label>
      </div>
    ))}
  </div>
);

type DataType = ComponentPerfStats & {
  componentName: string;
  msStylesTotal: number;
};

type DataTotalType = Omit<DataType, 'componentName'>;

function Filter({ column: { filterValue, preFilteredRows, setFilter } }) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

type Created = {
  telemetryRef: React.RefObject<Telemetry>;
  showDetails: boolean;
  filter: string;
  sort: { column: string; value: 'asc' | 'desc' };
  onFilterChange: (filter: string) => void;
  onSortChange: (column: string | undefined, dir: 'asc' | 'desc') => void;
};
const TelemetryGuardTable = React.memo<Created>(props => {
  const { showDetails, filter, sort, onFilterChange, onSortChange, telemetryRef } = props;
  const [tick, forceUpdate] = React.useReducer((c: number) => c + 1, 0) as [never, () => void];

  const data = React.useMemo(
    () =>
      _.map(
        telemetryRef.current.performance,
        (values, componentName): DataType => ({
          componentName,
          ...values,
          msStylesTotal: values.msResolveVariablesTotal + values.msResolveStylesTotal + values.msRenderStylesTotal,
        }),
      ),
    [tick, showDetails],
  );
  const totals = data.reduce<DataTotalType>(
    (acc, item) => ({
      instances: acc.instances + item.instances,
      renders: acc.renders + item.renders,

      msTotal: acc.msTotal + item.msTotal,
      msMin: acc.msMin + item.msMin,
      msMax: acc.msTotal + item.msMax,
      msStylesTotal: acc.msStylesTotal + item.msStylesTotal,

      msResolveVariablesTotal: acc.msResolveVariablesTotal + item.msResolveVariablesTotal,
      msResolveStylesTotal: acc.msResolveStylesTotal + item.msResolveStylesTotal,
      msRenderStylesTotal: acc.msRenderStylesTotal + item.msRenderStylesTotal,

      stylesRootCacheHits: acc.stylesRootCacheHits + item.stylesRootCacheHits,
      stylesSlotsCacheHits: acc.stylesSlotsCacheHits + item.stylesSlotsCacheHits,
    }),
    {
      instances: 0,
      renders: 0,

      msTotal: 0,
      msMin: 0,
      msMax: 0,
      msStylesTotal: 0,

      msResolveVariablesTotal: 0,
      msResolveStylesTotal: 0,
      msRenderStylesTotal: 0,

      stylesRootCacheHits: 0,
      stylesSlotsCacheHits: 0,
    },
  );

  const COLORS = ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'];
  const color = p => COLORS[Math.round((COLORS.length - 1) * p)];

  const columns = React.useMemo(() => {
    const componentsData = _.values(telemetryRef.current.performance);
    const firstComponentData = _.head(componentsData);

    const renderRoundingFooter = (field: keyof DataType) => () => <>{_.round(totals[field], 2)}</>;

    return firstComponentData
      ? [
          {
            Header: 'Components',
            columns: [
              {
                Header: 'Component',
                Filter,
                Footer: () => <b>Totals</b>,
                accessor: 'componentName',
                disableSortBy: true,
                filter: 'text',
              },
              {
                Header: 'Instances',
                Footer: renderRoundingFooter('instances'),
                accessor: 'instances',
                disableFilters: true,
              },
              {
                Header: 'Renders',
                Footer: renderRoundingFooter('renders'),
                accessor: 'renders',
                disableFilters: true,
              },
            ],
          },
          {
            Header: 'Timers',
            columns: [
              {
                Cell: ({ value }) => _.round(value, 2),
                Header: 'Total',
                Footer: renderRoundingFooter('msTotal'),
                accessor: 'msTotal',
                disableFilters: true,
                showPercentage: true,
              },
              {
                Cell: ({ value }) => _.round(value, 2),
                Header: 'Styles',
                Footer: renderRoundingFooter('msStylesTotal'),
                accessor: 'msStylesTotal',
                disableFilters: true,
                showPercentage: true,
              },
            ],
          },
          showDetails && {
            Header: 'Styles',
            columns: [
              {
                Cell: ({ value }) => _.round(value, 2),
                Header: 'Variables',
                Footer: renderRoundingFooter('msResolveVariablesTotal'),
                accessor: 'msResolveVariablesTotal',
                disableFilters: true,
              },
              {
                Cell: ({ value }) => _.round(value, 2),
                Header: 'Styles',
                Footer: renderRoundingFooter('msResolveStylesTotal'),
                accessor: 'msResolveStylesTotal',
                disableFilters: true,
              },
              {
                Cell: ({ value }) => _.round(value, 2),
                Header: 'Fela',
                Footer: renderRoundingFooter('msRenderStylesTotal'),
                accessor: 'msRenderStylesTotal',
                disableFilters: true,
              },
            ],
          },
          {
            Header: 'Cache',
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
        ].filter(Boolean)
      : [];
  }, [tick, showDetails]);

  const { getTableProps, getTableBodyProps, footerGroups, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,

      autoResetFilters: false,
      autoResetSortBy: false,
      disableMultiSort: true,

      initialState: {
        ...(filter && { filters: [{ id: 'componentName', value: filter }] }),
        ...(sort && { sortBy: [{ id: sort.column, desc: sort.value === 'desc' }] }),
      },
      stateReducer: (newState, action, prevState) => {
        if (action.type === 'setFilter' && action.columnId === 'componentName') {
          onFilterChange(action.filterValue);
        }

        if (action.type === 'toggleSortBy') {
          if (newState.sortBy.length > 0) {
            onSortChange(action.columnId, newState.sortBy[0].desc ? 'desc' : 'asc');
          } else {
            onSortChange(undefined, 'asc');
          }
        }

        return newState;
      },
    },
    useFilters,
    useSortBy,
  );

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      // forceUpdate();
    }, 2000);

    return () => clearInterval(intervalId);
  }, [forceUpdate]);

  return (
    <>
      <style>{`
        .telemetry-table {
          border-collapse: collapse;
          width: 100%;
        }
        
        .telemetry-table th {
          border: 1px solid gray;
        }
      
        .telemetry-table td {
          border: 1px solid gray;
          text-align: right;
        }
        
        .telemetry-table td:first-child {
          text-align: left;
        }
        
        `}</style>

      <table {...getTableProps()} className="telemetry-table">
        <thead>
          {headerGroups.map(group => (
            <tr {...group.getHeaderGroupProps()}>
              {group.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  <div {...column.getSortByToggleProps()}>
                    {column.render('Header')}
                    <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                  </div>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td
                    {...cell.getCellProps({
                      ...(cell.column.showPercentage && {
                        style: { backgroundColor: color(cell.value / totals[cell.column.id]) },
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
              {group.headers.find(header => header.Footer) &&
                group.headers.map(column => <td {...column.getFooterProps()}>{column.render('Footer')}</td>)}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  );
});

const TelemetryGuard: React.FC<{
  children: (telemetryRef: React.RefObject<Telemetry>, performance: StylesContextPerformance) => React.ReactElement;
}> = props => {
  const { children } = props;

  const defaultState: PerformanceState = {
    flags: defaultPerformanceFlags,
    filter: undefined,
    sort: undefined,
    styleDetails: true,
  };
  const [state, dispatch] = React.useReducer(
    stateReducer,
    // JSON.parse can't handle undefined
    JSON.parse(localStorage.fluentUIPerformancePanel ?? '""') || defaultState,
  );
  const telemetryRef = React.useRef<Telemetry>();

  React.useEffect(() => {
    (window as any).getFluentTelemetry = () => {
      // eslint-disable-next-line no-console
      console.table(telemetryRef.current.performance);
    };
  }, []);

  React.useEffect(() => {
    localStorage.fluentUIPerformancePanel = JSON.stringify(state);
  }, [state]);

  const handleStyleDetailsChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: 'STYLE_DETAILS', value: e.target.checked }),
    [],
  );
  const handleFilterChange = React.useCallback(
    (filter: string) => dispatch({ type: 'COMPONENT_FILTER', value: filter }),
    [],
  );
  const handleSortChange = React.useCallback(
    (column, dir) => dispatch({ type: 'COLUMN_SORT', column, value: dir }),
    [],
  );

  return (
    <>
      {children(telemetryRef, state.flags)}
      {ReactDOM.createPortal(
        <div
          style={{
            fontSize: '10px',
            position: 'fixed',
            right: 0,
            bottom: 0,
            background: '#fff',

            minWidth: 500,
          }}
        >
          <div style={{ display: 'flex' }}>
            <input checked={state.styleDetails} onChange={handleStyleDetailsChange} type="checkbox" />
            <label style={{ marginLeft: 5 }}>Show all details</label>
          </div>

          <TelemetryGuardTable
            telemetryRef={telemetryRef}
            showDetails={state.styleDetails}
            filter={state.filter}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            sort={state.sort}
          />
          <div style={{ border: '1px solid gray', display: 'flex', padding: '5px' }}>
            <TelemetryGuardPerfFlags flags={state.flags} onChange={dispatch} />
            <div>
              <button onClick={() => telemetryRef.current.reset()}>Clear telemetry</button>
              <button
                onClick={() => {
                  throw new Error('Plz implement me');
                }}
              >
                Reset perf flags to defaults
              </button>
              <span style={{ color: 'red' }}>CLOSE YOUR CONSOLE OR YOUR MEASURES WILL BE WRONG</span>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};

class App extends React.Component<any, ThemeContextData> {
  // State also contains the updater function so it will
  // be passed down into the context provider
  state: ThemeContextData = {
    ...themeContextDefaults,
    changeTheme: (e, { value: item }) => this.setState({ themeName: item.value }),
  };

  render() {
    const { themeName } = this.state;
    return (
      <ThemeContext.Provider value={this.state}>
        <TelemetryGuard>
          {(telemetryRef, performance) => (
            <PureRender telemetryRef={telemetryRef} performance={performance} themeName={themeName} />
          )}
        </TelemetryGuard>
      </ThemeContext.Provider>
    );
  }
}

const PureRender = React.memo<any>(({ telemetryRef, performance, themeName }) => (
  <Provider
    as={React.Fragment}
    theme={mergeThemes(themes[themeName], {
      staticStyles: [
        {
          a: {
            textDecoration: 'none',
          },
        },
      ],
    })}
    performance={performance}
    telemetryRef={telemetryRef}
  >
    <Debug />
    <Routes />
  </Provider>
));

export default hot(App);
