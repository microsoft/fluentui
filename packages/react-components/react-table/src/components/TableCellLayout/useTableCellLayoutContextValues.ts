import * as React from 'react';
import { TableContextValue } from '../Table/Table.types';
import type { TableCellLayoutState, TableCellLayoutContextValues } from './TableCellLayout.types';

const tableAvatarSizeMap: Record<TableContextValue['size'], number | undefined> = {
  medium: undefined,
  small: 24,
  smaller: 20,
};

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
