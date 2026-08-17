import { clsx } from 'clsx';

import type { DrawerHeaderState } from './DrawerHeader.types';

import styles from './DrawerHeader.module.css';

/**
 * DrawerHeader's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * The value is a class TOKEN, not a selector — build one with `fuiSelector()` from
 * `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately untagged: `@deprecated` would propagate to every re-exporting barrel and
 * trip `@typescript-eslint/no-deprecated` at each one. The narrowed type is the contract.
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

  // ARGUMENT ORDER — `styles.root`, marker, consumer className (DECISIONS.md D16.2). The
  // unconditional hashed module class leads so the marker is never `classList[0]`: nwsapi's
  // jsdom `:scope` polyfill builds its anchor from `escape(element.classList[0])` and the
  // `/` survives that escaping into an invalid selector (D15.1). Before D16 the
  // `fui-DrawerHeader` static held that position.
  //
  // The two separator slices carry no class of their own any more — they are
  // `data-scroll-state` selectors inside `.root` — so this call has no conditional argument.
  state.root.className = clsx(styles.root, drawerHeaderClassNames.root, state.root.className);

  return state;
};
