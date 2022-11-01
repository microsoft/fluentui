import { useTableContextValues_unstable } from '../Table/useTableContextValues';
import { DataGridState } from './DataGrid.types';

export function useDataGridContextValues_unstable(state: DataGridState) {
  return useTableContextValues_unstable(state);
}
