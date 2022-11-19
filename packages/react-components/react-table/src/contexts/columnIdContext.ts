import * as React from 'react';
import type { ColumnId } from '../hooks/';

const columnIdContext = React.createContext<ColumnId | undefined>(undefined);

export const columnIdContextDefaultValue = '';

export const useColumnIdContext = () => React.useContext(columnIdContext) ?? columnIdContextDefaultValue;

export const ColumnIdContextProvider = columnIdContext.Provider;
