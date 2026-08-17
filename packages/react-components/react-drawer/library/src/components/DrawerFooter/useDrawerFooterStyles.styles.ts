import { clsx } from 'clsx';

import type { DrawerFooterState } from './DrawerFooter.types';

import styles from './DrawerFooter.module.css';

/**
 * DrawerFooter's public identity class — the Tailwind named-group marker
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

  // ARGUMENT ORDER — `styles.root`, marker, consumer className (DECISIONS.md D16.2). The
  // unconditional hashed module class leads so the marker is never `classList[0]`: nwsapi's
  // jsdom `:scope` polyfill builds its anchor from `escape(element.classList[0])` and the
  // `/` survives that escaping into an invalid selector (D15.1). Before D16 the
  // `fui-DrawerFooter` static held that position.
  //
  // The two separator slices carry no class of their own any more — they are
  // `data-scroll-state` selectors inside `.root` — so this call has no conditional argument.
  state.root.className = clsx(styles.root, drawerFooterClassNames.root, state.root.className);

  return state;
};
