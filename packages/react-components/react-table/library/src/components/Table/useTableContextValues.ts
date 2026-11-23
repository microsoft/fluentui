'use client';

import * as React from 'react';
import type { TableBaseState, TableContextValues, TableState } from './Table.types';

export function useTableContextValues_unstable(
  state: TableBaseState & Partial<Pick<TableState, 'size'>>,
): TableContextValues {
  const { size = 'medium', noNativeElements, sortable } = state;

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
