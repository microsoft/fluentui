'use client';

/*
 * NOTE on the directive above:
 * this file keeps `'use client'` because it still calls `useDrawerHeaderStyles_unstable`,
 * so `enforce-use-client` sees a hook call and never reports the directive as unnecessary —
 * and that same call is what keeps this function a HOOK in the react-compiler's eyes.
 * Converted leaf hooks call nothing and carry no directive at all; see useNavStyles.styles.ts.
 */

import { clsx } from 'clsx';
import { useDrawerHeaderStyles_unstable } from '@fluentui/react-drawer';

import type { NavDrawerHeaderState } from './NavDrawerHeader.types';

import styles from './NavDrawerHeader.module.css';

/**
 * NavDrawerHeader's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * The rendered element carries TWO markers, this one and react-drawer's
 * `group/fui-drawer-header`: a NavDrawerHeader IS a DrawerHeader (D16.3), and a descendant
 * can address whichever identity it means.
 *
 * The value is a class TOKEN, not a selector — build one with `fuiSelector()` from
 * `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately untagged: `@deprecated` would propagate to every re-exporting barrel and
 * trip `@typescript-eslint/no-deprecated` at each one. The narrowed type is the contract.
 */
export const navDrawerHeaderClassNames: { root: string } = {
  root: 'group/fui-nav-drawer-header',
};

/**
 * Apply styling to the NavDrawerHeader slots based on the state
 */
export const useNavDrawerHeaderStyles_unstable = (state: NavDrawerHeaderState): NavDrawerHeaderState => {
  state = useDrawerHeaderStyles_unstable(state);

  // ARGUMENT ORDER — `styles.root`, marker, consumer className (DECISIONS.md D16.2). The
  // unconditional hashed module class leads so the marker is never `classList[0]`: nwsapi's
  // jsdom `:scope` polyfill builds its anchor from `escape(element.classList[0])` and the
  // `/` survives that escaping into an invalid selector, throwing a render-time
  // `AggregateError` (D15.1). Before D16 the `fui-NavDrawerHeader` static held that position.
  //
  // DrawerHeader's hook has already run, so its module class + `group/fui-drawer-header` are
  // inside `state.root.className` and end up AFTER this pair. Cascade priority comes from
  // the `@layer` order (NavDrawerHeader.module.css authors at `fui.components.l2`), not from
  // string position.
  state = {
    ...state,
    root: { ...state.root, className: clsx(styles.root, navDrawerHeaderClassNames.root, state.root.className) },
  };

  return state;
};
