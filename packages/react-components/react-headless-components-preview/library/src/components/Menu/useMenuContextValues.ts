'use client';

import { useMenuContextValues_unstable } from '@fluentui/react-menu';
import type { MenuState, MenuContextValues } from './Menu.types';

export const useMenuContextValues = (state: MenuState): MenuContextValues => {
  return useMenuContextValues_unstable(state as Parameters<typeof useMenuContextValues_unstable>[0]);
};
