'use client';

import { useMenuBase_unstable } from '@fluentui/react-menu';
import type { MenuProps, MenuState } from './Menu.types';

/**
 * Returns the state required to render Menu.
 *
 * Delegates to v9's `useMenuBase_unstable` — a tabster-, motion-, and
 * Griffel-free variant that still owns ARIA wiring, controlled open state,
 * positioning ref attachment, click/scroll-outside dismissal, and
 * checked-value selection state.
 */
export const useMenu = (props: MenuProps): MenuState => {
  return useMenuBase_unstable(props);
};
