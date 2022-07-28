import { createContext, useContextSelector, ContextSelector } from '@fluentui/react-context-selector';
import type { TableContextValue } from './types';

const tableContext = createContext<TableContextValue | undefined>(undefined);

const tableContextDefaultValue: TableContextValue = {
  size: 'medium',
  noNativeElements: false,
  items: [],
};

export const TableContextProvider = tableContext.Provider;
export const useTableContext = <T>(selector: ContextSelector<TableContextValue, T>): T =>
  useContextSelector(tableContext, (ctx = tableContextDefaultValue) => selector(ctx));
