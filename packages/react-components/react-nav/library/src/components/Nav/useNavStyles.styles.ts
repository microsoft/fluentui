import { clsx } from 'clsx';

import type { NavState } from './Nav.types';

import styles from './Nav.module.css';

/**
 * Nav's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const navClassNames: { root: string } = {
  root: 'group/fui-nav',
};

/**
 * Apply styling to the Nav slots based on the state
 */
export const useNavStyles_unstable = (state: NavState): NavState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, navClassNames.root, state.root.className);

  return state;
};
