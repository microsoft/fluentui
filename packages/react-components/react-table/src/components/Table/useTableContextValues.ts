import * as React from 'react';
import { TableContextValues, TableState } from './Table.types';

export function useTableContextValues_unstable(state: TableState): TableContextValues {
  const { size, noNativeElements, sortable, layoutType } = state;

  const tableContext = React.useMemo(
    () => ({
      noNativeElements,
      size,
      sortable,
      layoutType,
    }),
    [noNativeElements, size, sortable, layoutType],
  );

  return {
    table: tableContext,
  };
}
