import { TableContextValues, TableState } from './Table.types';

export function useTableContextValues_unstable(state: TableState): TableContextValues {
  const { size, noNativeElements, sortable } = state;

  return {
    table: {
      noNativeElements,
      size,
      sortable,
    },
  };
}
