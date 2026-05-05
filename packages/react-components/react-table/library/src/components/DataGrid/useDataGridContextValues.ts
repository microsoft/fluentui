'use client';

import * as React from 'react';
import { useTableContextValues_unstable } from '../Table/useTableContextValues';
import type { DataGridContextValues, DataGridState } from './DataGrid.types';

export function useDataGridContextValues_unstable(state: DataGridState): DataGridContextValues {
  const tableContextValues = useTableContextValues_unstable(state);
  const {
    tableState,
    focusMode,
    selectableRows,
    subtleSelection,
    selectionAppearance,
    resizableColumns,
    compositeRowTabsterAttribute,
  } = state;

  const dataGrid = React.useMemo(
    () => ({
      ...tableState,
      focusMode,
      selectableRows,
      subtleSelection,
      selectionAppearance,
      resizableColumns,
      compositeRowTabsterAttribute,
    }),
    [
      tableState,
      focusMode,
      selectableRows,
      subtleSelection,
      selectionAppearance,
      resizableColumns,
      compositeRowTabsterAttribute,
    ],
  );

  return {
    ...tableContextValues,
    dataGrid,
  };
}
