import { clsx } from 'clsx';

import type { NavItemState } from './NavItem.types';

import styles from './NavItem.module.css';

/**
 * NavItem's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * type has narrowed from `SlotClassNames<NavItemSlots>` to `{ root: string }` — the `icon`
 * key is gone (D16.5) — and the value is no longer the `fui-NavItem` BEM static (D16.1).
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but
 * terminates it in selector position, so `'.' + navItemClassNames.root` is invalid CSS.
 * Use `fuiSelector(navItemClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
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
