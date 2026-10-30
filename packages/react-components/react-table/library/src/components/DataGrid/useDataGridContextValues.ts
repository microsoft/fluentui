'use client';

import * as React from 'react';
import type { TabsterDOMAttribute } from '@fluentui/react-tabster';
import { useTableContextValues_unstable } from '../Table/useTableContextValues';
import type { DataGridBaseState, DataGridContextValues, DataGridState } from './DataGrid.types';

// Design state that is only present on the styled DataGrid state
const noTabsterAttribute = {} as TabsterDOMAttribute;

export function useDataGridContextValues_unstable(
  state: DataGridBaseState &
    Partial<Pick<DataGridState, 'size' | 'subtleSelection' | 'selectionAppearance' | 'compositeRowTabsterAttribute'>>,
): DataGridContextValues {
  const tableContextValues = useTableContextValues_unstable(state);
  const {
    tableState,
    focusMode,
    selectableRows,
    subtleSelection = false,
    selectionAppearance = 'brand',
    resizableColumns,
    compositeRowTabsterAttribute = noTabsterAttribute,
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
