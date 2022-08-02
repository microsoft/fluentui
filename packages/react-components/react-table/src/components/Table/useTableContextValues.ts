import { TableContextValues, TableState } from './Table.types';

export function useTableContextValues_unstable(state: TableState): TableContextValues {
  const { size, noNativeElements, sortable, sortColumn, sortDirection, requestSortColumnChange } = state;

  return {
    table: {
      noNativeElements,
      requestSortColumnChange,
      size,
      sortColumn,
      sortDirection,
      sortable,
    },
  };
}
