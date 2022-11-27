import * as React from 'react';
import type { RowId } from '../hooks/';

const rowIdContext = React.createContext<RowId | undefined>(undefined);

export const rowIdContextDefaultValue = '';

export const useRowIdContext = () => React.useContext(rowIdContext) ?? rowIdContextDefaultValue;

export const RowIdContextProvider = rowIdContext.Provider;
