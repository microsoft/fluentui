'use client';

import { createContext, useHasParentContext } from '@fluentui/react-context-selector';

/**
 * Empty context used solely to detect whether a Menu is rendered inside a
 * parent MenuList — i.e. whether it is a submenu.
 *
 * `@fluentui/react-menu` exposes a similar `MenuListContext` but does not
 * re-export it from the package entry point, and the package's `exports`
 * field blocks deep imports. Mirroring it here keeps the headless `useMenu`
 * free of any deep-import escape hatch.
 */
export const MenuListPresenceContext = createContext<true | undefined>(undefined);

export const MenuListPresenceProvider = MenuListPresenceContext.Provider;

export const useHasParentMenuList = (): boolean => useHasParentContext(MenuListPresenceContext);
