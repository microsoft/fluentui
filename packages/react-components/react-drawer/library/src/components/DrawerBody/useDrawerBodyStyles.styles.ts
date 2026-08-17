import { clsx } from 'clsx';

import type { DrawerBodyState } from './DrawerBody.types';

import styles from './DrawerBody.module.css';

/**
 * DrawerBody's public identity class — the Tailwind named-group marker
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
export const drawerBodyClassNames: { root: string } = {
  root: 'group/fui-drawer-body',
};

/**
 * Apply styling to the DrawerBody slots based on the state
 */
export const useDrawerBodyStyles_unstable = (state: DrawerBodyState): DrawerBodyState => {
  // ARGUMENT ORDER — `styles.root`, marker, consumer className (DECISIONS.md D16.2). The
  // unconditional hashed module class leads so the marker is never `classList[0]`: nwsapi's
  // jsdom `:scope` polyfill builds its anchor from `escape(element.classList[0])` and the
  // `/` survives that escaping into an invalid selector (D15.1). Before D16 the
  // `fui-DrawerBody` static held that position.
  state.root.className = clsx(styles.root, drawerBodyClassNames.root, state.root.className);

  return state;
};
