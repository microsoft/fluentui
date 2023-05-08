import * as React from 'react';
import { TableContextValues, TableState } from './Table.types';

export function useTableContextValues_unstable(state: TableState): TableContextValues {
  const { size, noNativeElements, sortable } = state;

  const tableContext = React.useMemo(
    () => ({
      noNativeElements,
      size,
      sortable,
    }),
    [noNativeElements, size, sortable],
  );

  return {
    table: tableContext,
  };
}
