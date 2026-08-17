import { clsx } from 'clsx';

import type { DrawerHeaderState } from './DrawerHeader.types';

import styles from './DrawerHeader.module.css';

/**
 * DrawerHeader's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const drawerHeaderClassNames: { root: string } = {
  root: 'group/fui-drawer-header',
};

/**
 * Data attribute rendered on the root slot and matched by `:where([data-scroll-state=…])`
 * selectors in `DrawerHeader.module.css`.
 *
 * The name is taken from the in-repo headless preview, which stamps exactly this on ITS
 * DrawerHeader root (`react-headless-components-preview/library/src/components/Drawer/
 * DrawerHeader/useDrawerHeader.ts:14`), and it is in the 25-name vocabulary
 * (reports/headless-precedent.md).
 *
 * It replaces BOTH Griffel branches: `scrollState !== 'none'` (draw the separator) and
 * `['middle','bottom'].includes(scrollState)` (make it visible) are now two selectors over
 * the same attribute. No native selector can express "the DrawerBody is scrolled", which is
 * the bar D15.6 sets for adding a `data-*` attribute at all.
 *
 * Not optional: `scrollState` is `Required` on the state and defaults to `'none'` in
 * `drawerContext`, so it never needs the `flag || undefined` form.
 */
type DrawerHeaderRootDataAttributes = {
  'data-scroll-state': DrawerHeaderState['scrollState'];
};

/**
 * Apply styling to the DrawerHeader slots based on the state
 */
export const useDrawerHeaderStyles_unstable = (state: DrawerHeaderState): DrawerHeaderState => {
  const root = state.root as DrawerHeaderState['root'] & DrawerHeaderRootDataAttributes;

  root['data-scroll-state'] = state.scrollState;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, drawerHeaderClassNames.root, state.root.className);

  return state;
};
