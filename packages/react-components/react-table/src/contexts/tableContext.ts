import { createContext, useContextSelector, ContextSelector } from '@fluentui/react-context-selector';
import { TableContextValue } from '../components/Table/Table.types';

const tableContext = createContext<TableContextValue | undefined>(undefined);

const tableContextDefaultValue: TableContextValue = {
  size: 'medium',
  noNativeElements: false,
  sortColumn: undefined,
  sortDirection: 'ascending',
  sortable: false,
  requestSortColumnChange: () => undefined,
};

export const TableContextProvider = tableContext.Provider;
export const useTableContext = <T>(selector: ContextSelector<TableContextValue, T>) =>
  useContextSelector(tableContext, (ctx = tableContextDefaultValue) => selector(ctx));
