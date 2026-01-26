import * as React from 'react';
import type { MenuGridCellContextValues, MenuGridCellState } from './MenuGridCell.types';

export function useMenuGridCellContextValues_unstable(state: MenuGridCellState): MenuGridCellContextValues {
  const menuGridCell = React.useMemo(() => ({}), []);

  return { menuGridCell };
}
