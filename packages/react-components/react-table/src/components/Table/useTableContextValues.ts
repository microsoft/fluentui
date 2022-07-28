import { TableState } from './Table.types';

export function useTableContextValues_unstable(state: TableState) {
  const { size, noNativeElements, items, columns } = state;
  return {
    table: {
      columns,
      items,
      noNativeElements,
      size,
    },
  };
}
