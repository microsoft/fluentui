import { useTableContextValues_unstable } from '../Table/useTableContextValues';
import { DataGridContextValues, DataGridState } from './DataGrid.types';

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
  return {
    ...tableContextValues,
    dataGrid: {
      ...tableState,
      focusMode,
      selectableRows,
      subtleSelection,
      selectionAppearance,
      resizableColumns,
      compositeRowTabsterAttribute,
    },
  };
}
