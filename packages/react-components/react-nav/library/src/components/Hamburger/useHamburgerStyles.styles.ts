'use client';

/*
 * NOTE on the directive above:
 * this file keeps `'use client'` because it still calls `useButtonStyles_unstable`, so
 * `enforce-use-client` sees a hook call and never reports the directive as unnecessary — and
 * that same call is what keeps this function a HOOK in the react-compiler's eyes. Converted
 * leaf hooks call nothing and carry no directive at all; see useNavStyles.styles.ts.
 */

import { clsx } from 'clsx';
import { useButtonStyles_unstable } from '@fluentui/react-button';

import type { HamburgerState } from './Hamburger.types';

import styles from './Hamburger.module.css';

/**
 * Hamburger's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * The rendered element carries TWO markers, this one and react-button's `group/fui-button`:
 * a Hamburger IS a Button (D16.3), and a descendant can address whichever identity it means.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const hamburgerClassNames: { root: string } = {
  root: 'group/fui-hamburger',
};

/**
 * Apply styling to the Hamburger slots based on the state
 */
export const useHamburgerStyles_unstable = (state: HamburgerState): HamburgerState => {
  state = useButtonStyles_unstable(state);

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = {
    ...state,
    root: { ...state.root, className: clsx(styles.root, hamburgerClassNames.root, state.root.className) },
  };

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.

  return state;
};
