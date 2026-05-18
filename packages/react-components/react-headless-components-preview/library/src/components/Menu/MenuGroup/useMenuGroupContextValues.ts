'use client';

import { useMenuGroupContextValues_unstable } from '@fluentui/react-menu';
import type { MenuGroupContextValues, MenuGroupState } from '@fluentui/react-menu';

export const useMenuGroupContextValues = (state: MenuGroupState): MenuGroupContextValues => {
  return useMenuGroupContextValues_unstable(state);
};
