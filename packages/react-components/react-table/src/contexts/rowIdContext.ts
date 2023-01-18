import * as React from 'react';
import type { TableRowId } from '../hooks/';

const rowIdContext = React.createContext<TableRowId | undefined>(undefined);

export const tableRowIdContextDefaultValue = '';

export const useTableRowIdContext = () => React.useContext(rowIdContext) ?? tableRowIdContextDefaultValue;

export const TableRowIdContextProvider = rowIdContext.Provider;
