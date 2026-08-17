import { clsx } from 'clsx';

import type { NavItemState } from './NavItem.types';

import styles from './NavItem.module.css';

/**
 * NavItem's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const navItemClassNames: { root: string } = {
  root: 'group/fui-nav-item',
};

/**
 * Apply styling to the NavItem slots based on the state
 */
export const useNavItemStyles_unstable = (state: NavItemState): NavItemState => {
  const { selected, density } = state;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    navItemClassNames.root,
    density === 'small' && styles.small,
    selected && styles.indicator,
    selected && styles.selected,
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = clsx(styles.icon, selected && styles['icon-selected'], state.icon.className);
  }

  return state;
};
