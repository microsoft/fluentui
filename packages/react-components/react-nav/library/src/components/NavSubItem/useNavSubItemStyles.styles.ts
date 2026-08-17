import { clsx } from 'clsx';

import type { NavSubItemState } from './NavSubItem.types';

import styles from './NavSubItem.module.css';

/**
 * NavSubItem's public identity class — the Tailwind named-group marker
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
export const navSubItemClassNames: { root: string } = {
  root: 'group/fui-nav-sub-item',
};

/**
 * Apply styling to the NavSubItem slots based on the state
 */
export const useNavSubItemStyles_unstable = (state: NavSubItemState): NavSubItemState => {
  const { selected, density } = state;
  const isSmallDensity = density === 'small';

  // ARGUMENT ORDER — `styles.root`, marker, conditional module classes, consumer className
  // (DECISIONS.md D16.2). The unconditional hashed module class leads so the marker is never
  // `classList[0]`: nwsapi's jsdom `:scope` polyfill builds its anchor from
  // `escape(element.classList[0])` and the `/` survives that escaping into an invalid
  // selector, throwing a render-time `AggregateError` (D15.1). Before D16 the
  // `fui-NavSubItem` static held that position.
  //
  // `styles.base` is unconditional but cannot lead: it is argument #5, and the module's
  // block order (which IS the cascade) depends on it staying after `styles['small-base']`.
  // `styles.root` is the reset's class and is both unconditional and first.
  //
  // Cascade priority is decided by the `@layer fui.*` order in NavSubItem.module.css, not by
  // the order of these arguments — including the two inversions its header documents.
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
