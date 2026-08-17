import { clsx } from 'clsx';

import type { DrawerHeaderNavigationState } from './DrawerHeaderNavigation.types';

import styles from './DrawerHeaderNavigation.module.css';

/**
 * DrawerHeaderNavigation's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const drawerHeaderNavigationClassNames: { root: string } = {
  root: 'group/fui-drawer-header-navigation',
};

/**
 * Apply styling to the DrawerHeaderNavigation slots based on the state
 */
export const useDrawerHeaderNavigationStyles_unstable = (
  state: DrawerHeaderNavigationState,
): DrawerHeaderNavigationState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, drawerHeaderNavigationClassNames.root, state.root.className);

  return state;
};
