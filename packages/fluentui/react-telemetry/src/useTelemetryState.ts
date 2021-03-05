import { defaultPerformanceFlags, StylesContextPerformance } from '@fluentui/react-bindings';
import * as React from 'react';

export type TelemetryPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type TelemetryTabs = 'telemetry' | 'performance-flags';
export type TelemetryTableSort = { column: string; direction: 'asc' | 'desc' };
export type TelemetryTableExpandNames = 'styles' | 'total';

export type TelemetryAction =
  | {
      name: keyof StylesContextPerformance;
      type: 'SET_PERFORMANCE_FLAG';
      value: boolean;
    }
  | { type: 'SET_TABLE_EXPAND'; value: boolean; name: TelemetryTableExpandNames }
  | { type: 'SET_TABLE_COMPONENT_FILTER'; value: string | undefined }
  | { type: 'SET_TABLE_SORT'; value: TelemetryTableSort | undefined }
  | { type: 'SET_TELEMETRY_TAB'; tab: TelemetryTabs }
  | { type: 'SET_POSITION'; value: TelemetryPosition }
  | { type: 'SET_VISIBILITY'; value: boolean };

export type TelemetryState = {
  activeTab: TelemetryTabs;
  performanceFlags: StylesContextPerformance;

  tableComponentFilter: string | undefined;
  tableSort: TelemetryTableSort | undefined;
  tableExpand: Record<TelemetryTableExpandNames, boolean>;

  position: TelemetryPosition;
  visible: boolean;
};

const stateReducer: React.Reducer<TelemetryState, TelemetryAction> = (prevState, action) => {
  switch (action.type) {
    case 'SET_PERFORMANCE_FLAG':
      return { ...prevState, performanceFlags: { ...prevState.performanceFlags, [action.name]: action.value } };

    case 'SET_TELEMETRY_TAB':
      return { ...prevState, activeTab: action.tab };

    case 'SET_TABLE_EXPAND':
      return { ...prevState, tableExpand: { ...prevState.tableExpand, [action.name]: action.value } };

    case 'SET_TABLE_COMPONENT_FILTER':
      return { ...prevState, tableComponentFilter: action.value };

    case 'SET_TABLE_SORT':
      if (action.value) {
        return { ...prevState, tableSort: action.value };
      }

      return { ...prevState, tableSort: undefined };

    case 'SET_POSITION':
      return { ...prevState, position: action.value };

    case 'SET_VISIBILITY':
      return { ...prevState, visible: action.value };

    default:
      throw new Error('Not implemented');
  }
};

const defaultState: TelemetryState = {
  activeTab: 'telemetry',
  performanceFlags: defaultPerformanceFlags,

  tableComponentFilter: undefined,
  tableSort: undefined,
  tableExpand: {
    styles: true,
    total: false,
  },

  position: 'bottom-right',
  visible: false,
};

export function useTelemetryState(): [TelemetryState, React.Dispatch<TelemetryAction>] {
  const [state, dispatch] = React.useReducer(
    stateReducer,
    // JSON.parse can't handle undefined
    JSON.parse(localStorage.fluentUIPerformancePanel ?? '""') || defaultState,
  );

  React.useEffect(() => {
    localStorage.fluentUIPerformancePanel = JSON.stringify(state);
  }, [state]);

  return [state, dispatch];
}
