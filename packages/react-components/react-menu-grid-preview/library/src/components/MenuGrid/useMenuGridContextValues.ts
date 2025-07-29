import * as React from 'react';
import type { MenuGridContextValues, MenuGridState } from './MenuGrid.types';

export function useMenuGridContextValues_unstable(state: MenuGridState): MenuGridContextValues {
  const { tableRowTabsterAttribute } = state;
  const menuGrid = React.useMemo(() => ({ tableRowTabsterAttribute }), [tableRowTabsterAttribute]);

  return { menuGrid };
}
