import * as _ from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { Provider, Debug, teamsTheme, teamsDarkTheme, teamsHighContrastTheme } from '@fluentui/react-northstar';

import { mergeThemes } from '@fluentui/styles';
import { ComponentPerfStats, defaultPerformanceFlags, StylesContextPerformance } from '@fluentui/react-bindings';
import { useTable, useSortBy } from 'react-table';

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

type PerfFlagAction = {
  name: keyof StylesContextPerformance;
  value: boolean;
};

const reducer: React.Reducer<StylesContextPerformance, PerfFlagAction> = (prevState, action) => {
  return {
    ...prevState,
    [action.name]: action.value,
  };
};

const TelemetryGuardPerfFlags: React.FC<{
  flags: StylesContextPerformance;
  onChange: React.Dispatch<PerfFlagAction>;
}> = props => (
  <div style={{ flex: 1 }}>
    {Object.keys(props.flags).map(flag => (
      <div key={flag} style={{ display: 'flex' }}>
        <input
          checked={props.flags[flag]}
          name={flag}
          type="checkbox"
          onChange={e =>
            props.onChange({ name: e.target.name as keyof StylesContextPerformance, value: e.target.checked })
          }
        />
        <label style={{ paddingLeft: 5 }}>{flag}</label>
      </div>
    ))}
  </div>
);

const TelemetryGuardView: React.FC<{ telemetryRef: React.RefObject<Telemetry> }> = ({ telemetryRef }) => {
  const [i, forceUpdate] = React.useReducer((c: number) => c + 1, 0) as [never, () => void];

  const columns = React.useMemo(() => {
    const componentsData = _.values(telemetryRef.current.performance);
    const firstComponentData = _.head(componentsData);

    return firstComponentData
      ? [
          {
            Header: 'Component',
            accessor: 'componentName',
          },
          ..._.map(firstComponentData, (v, key) => ({
            Header: _.camelCase(key),
            accessor: key,
          })),
        ]
      : [];
  }, [i]);
  const data = React.useMemo(
    () =>
      _.map(telemetryRef.current.performance, (values, componentName): ComponentPerfStats & {
        componentName: string;
      } => ({
        componentName,
        ...values,
        msTotal: _.round(values.msTotal, 2),
        msMin: _.round(values.msMin, 2),
        msMax: _.round(values.msMax, 2),
      })),
    [i],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,

      autoResetSortBy: false,
    },
    useSortBy,
  );

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.slice(0, 20);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      forceUpdate();
    }, 2000);

    return () => clearInterval(intervalId);
  }, [forceUpdate]);

  return (
    <table
      {...getTableProps()}
      style={{ border: '1px solid grey', borderBottom: 0, borderCollapse: 'collapse', width: '100%' }}
    >
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              // Add the sorting props to control sorting. For this example
              // we can add them into the header props
              <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ border: '1px solid grey' }}>
                {column.render('Header')}
                {/* Add a sort direction indicator */}
                <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {firstPageRows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps()} style={{ border: '1px solid grey' }}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const TelemetryGuard: React.FC<{
  children: (telemetryRef: React.RefObject<Telemetry>, performance: StylesContextPerformance) => React.ReactElement;
}> = props => {
  const { children } = props;

  const [flags, dispatch] = React.useReducer(reducer, defaultPerformanceFlags);
  const telemetryRef = React.useRef<Telemetry>();

  React.useEffect(() => {
    (window as any).getFluentTelemetry = () => {
      // eslint-disable-next-line no-console
      console.table(telemetryRef.current.performance);
    };
  }, []);

  return (
    <>
      {children(telemetryRef, flags)}
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
          <TelemetryGuardView telemetryRef={telemetryRef} />
          <div style={{ border: '1px solid gray', display: 'flex', padding: '5px' }}>
            <TelemetryGuardPerfFlags flags={flags} onChange={dispatch} />
            <div>
              <button onClick={() => telemetryRef.current.reset()}>Clear telemetry</button>
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
          )}
        </TelemetryGuard>
      </ThemeContext.Provider>
    );
  }
}

export default hot(App);
