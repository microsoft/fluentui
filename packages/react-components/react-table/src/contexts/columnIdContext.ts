import * as React from 'react';
import type { TableColumnId } from '../hooks/';

const columnIdContext = React.createContext<TableColumnId | undefined>(undefined);

export const columnIdContextDefaultValue = '';

export const useColumnIdContext = () => React.useContext(columnIdContext) ?? columnIdContextDefaultValue;

export const ColumnIdContextProvider = columnIdContext.Provider;
