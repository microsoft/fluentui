import { clsx } from 'clsx';
import type { RatingItemState } from './RatingItem.types';

import styles from './RatingItem.module.css';

/**
 * Public identity classes for RatingItem.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (`migration/griffel-to-tailwind/reports/DECISIONS.md`,
 * D15.1 / D16.5) — usable as a selector and as a `group-*` variant target. The per-slot keys
 * (`selectedIcon`, `unselectedIcon`, `halfValueInput`, `fullValueInput`) were removed: there
 * is no public class-name handle on component internals any more.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + ratingItemClassNames.root` is invalid. Use `fuiSelector()` from
 * `@fluentui/react-utilities` (or `@fluentui/react-components`) at every selector site.
 */
export const ratingItemClassNames: { root: string } = {
  root: 'group/fui-rating-item',
};

/**
 * Data attribute rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `size` is a scale prop, so it rides a data-attribute rather than a module class
 * (DECISIONS.md D3). It selects rules on the root element itself — `useStyles[size]` is a
 * root-slot argument — so no descendant selector is involved.
 *
 * The other two enum props stay module classes: `color` and `appearance` are LOOK props,
 * and their slices land on the icon slots with per-slot argument positions the root could
 * not express.
 */
type RatingItemRootDataAttributes = {
  'data-size': RatingItemState['size'];
};

/**
 * Apply styling to the RatingItem slots based on the state
 */
export const useRatingItemStyles_unstable = (state: RatingItemState): RatingItemState => {
  const { color, size, iconFillWidth, appearance } = state;

  const root = state.root as RatingItemState['root'] & RatingItemRootDataAttributes;

  root['data-size'] = size;

  // `styles.root` first, then the named group marker — the marker must never be
  // `classList[0]` (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md
  // D15.1 / D16.2) — with the consumer className last. `styles.root` is unconditional and
  // `clsx` never drops it, so index 0 is always the hashed, selector-safe module class; the
  // BEM static that used to hold that position was removed in D16.1. The marker is a
  // literal, unhashed, GLOBAL token: it is the only handle by which another module — in
  // this package or any other — can style an element from this RatingItem's state, because
  // `styles.root` is hashed and unaddressable from outside this file. `data-size` is
  // already stamped on this very element above, so
  // `@variant group-size-large/fui-rating-item { … }` works as-is (DECISIONS.md D15,
  // Tier 0 — no state mirrors needed).
  //
  // Cascade priority is decided by the `@layer fui.*` order in RatingItem.module.css, not
  // by the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces, including why `useIndicatorStyles.filled`
  // is split across two blocks there.
  state.root.className = clsx(styles.root, ratingItemClassNames.root, state.root.className);

  if (state.halfValueInput) {
    state.halfValueInput.className = clsx(styles.input, styles['input-lower-half'], state.halfValueInput.className);
  }

  if (state.fullValueInput) {
    state.fullValueInput.className = clsx(
      styles.input,
      state.halfValueInput && styles['input-upper-half'],
      state.fullValueInput.className,
    );
  }

  if (state.unselectedIcon) {
    state.unselectedIcon.className = clsx(
      styles.icon,
      appearance === 'filled' && styles.filled,
      color === 'brand' && (appearance === 'filled' ? styles['brand-filled'] : styles.brand),
      color === 'marigold' && (appearance === 'filled' ? styles['marigold-filled'] : styles.marigold),
      iconFillWidth === 0.5 && styles['icon-upper-half'],
      state.unselectedIcon.className,
    );
  }

  if (state.selectedIcon) {
    state.selectedIcon.className = clsx(
      styles.icon,
      color === 'brand' && styles.brand,
      color === 'marigold' && styles.marigold,
      iconFillWidth === 0.5 && styles['icon-lower-half'],
      state.selectedIcon.className,
    );
  }

  return state;
};
