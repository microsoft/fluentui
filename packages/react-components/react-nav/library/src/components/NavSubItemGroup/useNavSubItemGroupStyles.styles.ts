import { clsx } from 'clsx';

import type { NavSubItemGroupState } from './NavSubItemGroup.types';

import styles from './NavSubItemGroup.module.css';

/**
 * NavSubItemGroup's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const navSubItemGroupClassNames: { root: string } = {
  root: 'group/fui-nav-sub-item-group',
};

/**
 * Apply styling to the NavSubItemGroup slots based on the state
 */
export const useNavSubItemGroupStyles_unstable = (state: NavSubItemGroupState): NavSubItemGroupState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, navSubItemGroupClassNames.root, state.root.className);

  return state;
};
