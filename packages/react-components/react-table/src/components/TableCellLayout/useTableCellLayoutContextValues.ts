import * as React from 'react';
import type { TableCellLayoutState, TableCellLayoutContextValues } from './TableCellLayout.types';

export function useTableCellLayoutContextValues_unstable(state: TableCellLayoutState): TableCellLayoutContextValues {
  const { size: tableSize } = state;

  const avatar = React.useMemo(
    () => ({
      size: tableAvatarSizeMap[tableSize],
    }),
    [tableSize],
  );

  return {
    avatar,
  };
}
