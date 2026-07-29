import { clsx } from 'clsx';

import type { NavSubItemState } from './NavSubItem.types';

import styles from './NavSubItem.module.css';

/**
 * NavSubItem's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * type has narrowed from `SlotClassNames<NavSubItemSlots>` to `{ root: string }`, and the
 * value is no longer the `fui-NavSubItem` BEM static (D16.1).
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but
 * terminates it in selector position, so `'.' + navSubItemClassNames.root` is invalid CSS.
 * Use `fuiSelector(navSubItemClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
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
    'group/fui-nav-sub-item',
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
