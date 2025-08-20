import * as React from 'react';
import type { MenuGridGroupContextValues, MenuGridGroupState } from './MenuGridGroup.types';

export function useMenuGridGroupContextValues_unstable(state: MenuGridGroupState): MenuGridGroupContextValues {
  const { headerId } = state;
  const MenuGridGroup = React.useMemo(() => ({ headerId }), [headerId]);

  return { MenuGridGroup };
}
