import { useTableContextValues_unstable } from '../Table/useTableContextValues';
import { DataGridContextValues, DataGridState } from './DataGrid.types';

export function useDataGridContextValues_unstable(state: DataGridState): DataGridContextValues {
  const tableContextValues = useTableContextValues_unstable(state);
  return {
    ...tableContextValues,
    dataGrid: {
      ...state.tableState,
      focusMode: state.focusMode,
      selectableRows: state.selectableRows,
      subtleSelection: state.subtleSelection,
      selectionAppearance: state.selectionAppearance,
      resizableColumns: state.resizableColumns,
    },
  };
}
