'use client';

/*
 * NOTE on the directive above:
 * this file keeps `'use client'` because it still calls `useDrawerFooterStyles_unstable`,
 * so `enforce-use-client` sees a hook call and never reports the directive as unnecessary —
 * and that same call is what keeps this function a HOOK in the react-compiler's eyes.
 * Converted leaf hooks call nothing and carry no directive at all; see useNavStyles.styles.ts.
 */

import { clsx } from 'clsx';
import { useDrawerFooterStyles_unstable } from '@fluentui/react-drawer';

import type { NavDrawerFooterState } from './NavDrawerFooter.types';

import styles from './NavDrawerFooter.module.css';

/**
 * NavDrawerFooter's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * The rendered element carries TWO markers, this one and react-drawer's
 * `group/fui-drawer-footer`: a NavDrawerFooter IS a DrawerFooter (D16.3), and a descendant
 * can address whichever identity it means.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const navDrawerFooterClassNames: { root: string } = {
  root: 'group/fui-nav-drawer-footer',
};

/**
 * Apply styling to the NavDrawerFooter slots based on the state
 */
export const useNavDrawerFooterStyles_unstable = (state: NavDrawerFooterState): NavDrawerFooterState => {
  state = useDrawerFooterStyles_unstable(state);

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = {
    ...state,
    root: { ...state.root, className: clsx(styles.root, navDrawerFooterClassNames.root, state.root.className) },
  };

  return state;
};
