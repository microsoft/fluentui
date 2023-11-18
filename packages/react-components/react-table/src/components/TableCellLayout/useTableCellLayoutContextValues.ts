import * as React from 'react';
import type { TableCellLayoutState, TableCellLayoutContextValues } from './TableCellLayout.types';

export function useTableCellLayoutContextValues_unstable(state: TableCellLayoutState): TableCellLayoutContextValues {
  const { avatarSize } = state;

  const avatar = React.useMemo(
    () => ({
      size: avatarSize,
    }),
    [avatarSize],
  );

  return {
    avatar,
  };
}
