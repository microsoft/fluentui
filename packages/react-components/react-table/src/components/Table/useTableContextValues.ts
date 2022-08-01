import { TableContextValues, TableState } from './Table.types';

export function useTableContextValues_unstable(state: TableState): TableContextValues {
  const { size, noNativeElements } = state;

  return {
    table: {
      size,
      noNativeElements,
    },
  };
}
