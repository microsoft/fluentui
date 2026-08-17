import { clsx } from 'clsx';

import type { NavSubItemState } from './NavSubItem.types';

import styles from './NavSubItem.module.css';

/**
 * NavSubItem's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const navSubItemClassNames: { root: string } = {
  root: 'group/fui-nav-sub-item',
};

/**
 * Apply styling to the NavSubItem slots based on the state
 */
export const useNavSubItemStyles_unstable = (state: NavSubItemState): NavSubItemState => {
  const { selected, density } = state;
  const isSmallDensity = density === 'small';

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    navSubItemClassNames.root,
    isSmallDensity && styles.small,
    isSmallDensity && styles['small-base'],
    styles.base,
    selected && styles.indicator,
    selected && styles.selected,
    selected && styles['selected-indicator'],
    state.root.className,
  );

  return state;
};
