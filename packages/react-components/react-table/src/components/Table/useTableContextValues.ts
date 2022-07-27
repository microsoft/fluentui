import * as React from 'react';
import { TableContextValue } from '../../contexts/types';
import { TableState } from './Table.types';

export function useTableContextValues_unstable(state: TableState) {
  const table = React.useMemo<TableContextValue>(
    () => ({
      size: state.size,
      noNativeElements: state.noNativeElements,
    }),
    [state.size, state.noNativeElements],
  );

  return { table };
}
