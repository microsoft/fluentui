import { clsx } from 'clsx';

import type { NavCategoryItemState } from './NavCategoryItem.types';

import styles from './NavCategoryItem.module.css';

/**
 * NavCategoryItem's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * type has narrowed from `SlotClassNames<NavCategoryItemSlots>` to `{ root: string }` — the
 * `icon`, `expandIcon` and `expandIconMotion` keys are gone (D16.5) — and the value is no
 * longer the `fui-NavCategoryItem` BEM static (D16.1).
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but
 * terminates it in selector position, so `'.' + navCategoryItemClassNames.root` is invalid
 * CSS. Use `fuiSelector(navCategoryItemClassNames.root)` from `@fluentui/react-utilities`
 * (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
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
