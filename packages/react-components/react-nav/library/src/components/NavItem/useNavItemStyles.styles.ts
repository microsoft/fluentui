import { clsx } from 'clsx';

import type { NavItemState } from './NavItem.types';

import styles from './NavItem.module.css';

/**
 * NavItem's public identity class — the Tailwind named-group marker
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
export const navItemClassNames: { root: string } = {
  root: 'group/fui-nav-item',
};

/**
 * Apply styling to the NavItem slots based on the state
 */
export const useNavItemStyles_unstable = (state: NavItemState): NavItemState => {
  const { selected, density } = state;

  // ARGUMENT ORDER — `styles.root`, marker, conditional module classes, consumer className
  // (DECISIONS.md D16.2). The unconditional hashed module class leads so the marker is never
  // `classList[0]`: nwsapi's jsdom `:scope` polyfill builds its anchor from
  // `escape(element.classList[0])` and the `/` survives that escaping into an invalid
  // selector, throwing a render-time `AggregateError` (D15.1). Before D16 the `fui-NavItem`
  // static held that position.
  //
  // Cascade priority is decided by the `@layer fui.*` order in NavItem.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
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
