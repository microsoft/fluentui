import { clsx } from 'clsx';

import type { NavCategoryItemState } from './NavCategoryItem.types';

import styles from './NavCategoryItem.module.css';

/**
 * NavCategoryItem's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * The value is a class TOKEN, not a selector — build one with `fuiSelector()` from
 * `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately untagged: `@deprecated` would propagate to every re-exporting barrel and
 * trip `@typescript-eslint/no-deprecated` at each one. The narrowed type is the contract.
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

  // ARGUMENT ORDER — `styles.root`, marker, conditional module classes, consumer className
  // (DECISIONS.md D16.2). The unconditional hashed module class leads so the marker is never
  // `classList[0]`: nwsapi's jsdom `:scope` polyfill builds its anchor from
  // `escape(element.classList[0])` and the `/` survives that escaping into an invalid
  // selector, throwing a render-time `AggregateError` (D15.1). Before D16 the
  // `fui-NavCategoryItem` static held that position.
  //
  // Cascade priority is decided by the `@layer fui.*` order in NavCategoryItem.module.css,
  // not by the order of these arguments.
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
