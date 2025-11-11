import * as React from 'react';
import type { MenuGridRowContextValues, MenuGridRowState } from './MenuGridRow.types';

export function useMenuGridRowContextValues_unstable(state: MenuGridRowState): MenuGridRowContextValues {
  const menuGridRow = React.useMemo(() => ({}), []);

  return { menuGridRow };
}
