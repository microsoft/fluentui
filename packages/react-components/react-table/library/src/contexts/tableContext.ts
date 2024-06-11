import * as React from 'react';
import { TableContextValue } from '../components/Table/Table.types';

const tableContext = React.createContext<TableContextValue | undefined>(undefined);

export const tableContextDefaultValue: TableContextValue = {
  size: 'medium',
  noNativeElements: false,
  sortable: false,
};

export const TableContextProvider = tableContext.Provider;
export const useTableContext = () => React.useContext(tableContext) ?? tableContextDefaultValue;
