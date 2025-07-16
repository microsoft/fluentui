import * as React from 'react';
import type { MenuGridRowGroupContextValues, MenuGridRowGroupState } from './MenuGridRowGroup.types';

export function useMenuGridRowGroupContextValues_unstable(state: MenuGridRowGroupState): MenuGridRowGroupContextValues {
  const menuGridRowGroup = React.useMemo(() => ({}), []);

  return { menuGridRowGroup };
}
