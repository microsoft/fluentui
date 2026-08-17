import { clsx } from 'clsx';

import type { DrawerBodyState } from './DrawerBody.types';

import styles from './DrawerBody.module.css';

/**
 * DrawerBody's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const drawerBodyClassNames: { root: string } = {
  root: 'group/fui-drawer-body',
};

/**
 * Apply styling to the DrawerBody slots based on the state
 */
export const useDrawerBodyStyles_unstable = (state: DrawerBodyState): DrawerBodyState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, drawerBodyClassNames.root, state.root.className);

  return state;
};
