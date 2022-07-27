import * as React from 'react';
import type { TableContextValue } from './types';

const tableContext = React.createContext<TableContextValue | undefined>(undefined);

const tableContextDefaultValue: TableContextValue = {
  size: 'medium',
  noNativeElements: false,
};

export const TableContextProvider = tableContext.Provider;
export const useTableContext = () => React.useContext(tableContext) ?? tableContextDefaultValue;
