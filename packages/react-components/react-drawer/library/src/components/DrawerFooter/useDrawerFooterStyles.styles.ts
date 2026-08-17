import { clsx } from 'clsx';

import type { DrawerFooterState } from './DrawerFooter.types';

import styles from './DrawerFooter.module.css';

/**
 * DrawerFooter's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const drawerFooterClassNames: { root: string } = {
  root: 'group/fui-drawer-footer',
};

/**
 * Data attribute rendered on the root slot and matched by `:where([data-scroll-state=…])`
 * selectors in `DrawerFooter.module.css`.
 *
 * The name is taken from the in-repo headless preview, which stamps exactly this on ITS
 * DrawerFooter root (`react-headless-components-preview/library/src/components/Drawer/
 * DrawerFooter/useDrawerFooter.ts:14`), and it is in the 25-name vocabulary
 * (reports/headless-precedent.md).
 *
 * It replaces BOTH Griffel branches: `scrollState !== 'none'` (draw the separator) and
 * `['middle','top'].includes(scrollState)` (make it visible) are now two selectors over the
 * same attribute. No native selector can express "the DrawerBody is scrolled", which is the
 * bar D15.6 sets for adding a `data-*` attribute at all.
 *
 * Not optional: `scrollState` is `Required` on the state and defaults to `'none'` in
 * `drawerContext`, so it never needs the `flag || undefined` form.
 */
type DrawerFooterRootDataAttributes = {
  'data-scroll-state': DrawerFooterState['scrollState'];
};

/**
 * Apply styling to the DrawerFooter slots based on the state
 */
export const useDrawerFooterStyles_unstable = (state: DrawerFooterState): DrawerFooterState => {
  const root = state.root as DrawerFooterState['root'] & DrawerFooterRootDataAttributes;

  root['data-scroll-state'] = state.scrollState;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, drawerFooterClassNames.root, state.root.className);

  return state;
};
