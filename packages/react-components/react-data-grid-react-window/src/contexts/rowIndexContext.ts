import * as React from 'react';

const rowIndexContext = React.createContext<number | undefined>(undefined);

export const tableRowIndexContextDefaultValue = undefined;

export const useTableRowIndexContext = () => React.useContext(rowIndexContext) ?? tableRowIndexContextDefaultValue;

export const TableRowIndexContextProvider = rowIndexContext.Provider;
