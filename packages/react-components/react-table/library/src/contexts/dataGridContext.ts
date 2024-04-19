import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { ContextSelector } from '@fluentui/react-context-selector';
import { TabsterDOMAttribute } from '@fluentui/react-tabster';
import { DataGridContextValue } from '../components/DataGrid/DataGrid.types';
import { defaultTableState } from '../hooks';

const dataGridContext = createContext<DataGridContextValue | undefined>(undefined);

export const dataGridContextDefaultValue: DataGridContextValue = {
  ...defaultTableState,
  subtleSelection: false,
  selectableRows: false,
  selectionAppearance: 'brand',
  focusMode: 'none',
  compositeRowTabsterAttribute: {} as TabsterDOMAttribute,
};

export const DataGridContextProvider = dataGridContext.Provider;

export const useDataGridContext_unstable = <T>(selector: ContextSelector<DataGridContextValue, T>) =>
  useContextSelector(dataGridContext, (ctx = dataGridContextDefaultValue) => selector(ctx));
