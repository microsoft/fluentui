import { clsx } from 'clsx';

import type { DrawerState } from './Drawer.types';

import styles from './Drawer.module.css';

/**
 * Drawer's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * `Drawer` renders an `InlineDrawer` or an `OverlayDrawer` as its root, so the rendered
 * element carries TWO markers: this one and the concrete drawer's. That is the D16.3 shape —
 * a Drawer IS an OverlayDrawer — and a descendant can address whichever identity it means.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const drawerClassNames: { root: string } = {
  root: 'group/fui-drawer',
};

/**
 * Apply styling to the Drawer slots based on the state
 */
export const useDrawerStyles_unstable = (state: DrawerState): DrawerState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, drawerClassNames.root, state.root.className);

  return state;
};
