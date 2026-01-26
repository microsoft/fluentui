import * as React from 'react';
import type { MenuGridRowGroupHeaderContextValues, MenuGridRowGroupHeaderState } from './MenuGridRowGroupHeader.types';

export function useMenuGridRowGroupHeaderContextValues_unstable(
  state: MenuGridRowGroupHeaderState,
): MenuGridRowGroupHeaderContextValues {
  const menuGridRowGroupHeader = React.useMemo(() => ({}), []);

  return { menuGridRowGroupHeader };
}
