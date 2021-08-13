import * as React from 'react';
import { MenuGroupContextValues, MenuGroupState } from './MenuGroup.types';

export function useMenuGroupContextValues(state: MenuGroupState): MenuGroupContextValues {
  const { headerId } = state;
  const menuGroup = React.useMemo(() => ({ headerId }), [headerId]);

  return { menuGroup };
}
