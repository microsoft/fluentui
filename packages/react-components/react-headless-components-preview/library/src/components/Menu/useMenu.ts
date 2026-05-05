'use client';

import { useMenuBase_unstable } from '@fluentui/react-menu';
import type { MenuProps, MenuState } from './Menu.types';

export const useMenu = (props: MenuProps): MenuState => {
  return useMenuBase_unstable(props);
};
