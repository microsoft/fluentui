import * as React from 'react';
import { TableContextValues, TableState } from './Table.types';

export function useTableContextValues_unstable(state: TableState): TableContextValues {
  const { size, noNativeElements, sortable, columnSizingState } = state;

  const tableContext = React.useMemo(
    () => ({
      noNativeElements,
      size,
      sortable,
      columnSizingState,
    }),
    [noNativeElements, size, sortable, columnSizingState],
  );

  return {
    table: tableContext,
  };
}
