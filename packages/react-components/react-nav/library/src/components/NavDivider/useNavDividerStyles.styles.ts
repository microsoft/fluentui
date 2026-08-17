'use client';

/*
 * NOTE on the directive above:
 * this file keeps `'use client'` because it still calls `useDividerStyles_unstable`, so
 * `enforce-use-client` sees a hook call and never reports the directive as unnecessary — and
 * that same call is what keeps this function a HOOK in the react-compiler's eyes. Converted
 * leaf hooks call nothing and carry no directive at all; see useNavStyles.styles.ts.
 */

import { clsx } from 'clsx';
import { useDividerStyles_unstable } from '@fluentui/react-divider';

import type { NavDividerState } from './NavDivider.types';

import styles from './NavDivider.module.css';

/**
 * NavDivider's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * The rendered element carries TWO markers, this one and react-divider's
 * `group/fui-divider`: a NavDivider IS a Divider (D16.3), and a descendant can address
 * whichever identity it means.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const navDividerClassNames: { root: string } = {
  root: 'group/fui-nav-divider',
};

/**
 * Apply styling to the NavDivider slots based on the state
 */
export const useNavDividerStyles_unstable = (state: NavDividerState): NavDividerState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = {
    ...state,
    root: { ...state.root, className: clsx(styles.root, navDividerClassNames.root, state.root.className) },
  };

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.

  state = useDividerStyles_unstable(state);

  return state;
};
