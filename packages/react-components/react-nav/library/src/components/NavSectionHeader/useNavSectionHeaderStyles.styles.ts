import { clsx } from 'clsx';

import type { NavSectionHeaderState } from './NavSectionHeader.types';

import styles from './NavSectionHeader.module.css';

/**
 * NavSectionHeader's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const navSectionHeaderClassNames: { root: string } = {
  root: 'group/fui-nav-section-header',
};

/**
 * Apply styling to the NavSectionHeader slots based on the state
 */
export const useNavSectionHeaderStyles_unstable = (state: NavSectionHeaderState): NavSectionHeaderState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, navSectionHeaderClassNames.root, state.root.className);

  return state;
};
