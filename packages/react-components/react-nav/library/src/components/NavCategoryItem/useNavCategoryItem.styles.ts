import { clsx } from 'clsx';

import type { NavCategoryItemState } from './NavCategoryItem.types';

import styles from './NavCategoryItem.module.css';

/**
 * NavCategoryItem's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const navCategoryItemClassNames: { root: string } = {
  root: 'group/fui-nav-category-item',
};

/**
 * Apply styling to the NavCategoryItem slots based on the state
 */
export const useNavCategoryItemStyles_unstable = (state: NavCategoryItemState): NavCategoryItemState => {
  const { selected, open, density } = state;

  const showIndicator = selected && open === false;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    navCategoryItemClassNames.root,
    density === 'small' && styles.small,
    showIndicator && styles.indicator,
    showIndicator && styles.selected,
    state.root.className,
  );

  state.expandIcon.className = clsx(styles['expand-icon'], state.expandIcon.className);

  if (state.icon) {
    state.icon.className = clsx(styles.icon, selected && styles['icon-selected'], state.icon.className);
  }

  return state;
};
