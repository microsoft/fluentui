import { TableState } from './Table.types';

export function useTableContextValues_unstable(state: TableState) {
  const { size, noNativeElements, items } = state;
  return {
    table: {
      items,
      noNativeElements,
      size,
    },
  };
}
