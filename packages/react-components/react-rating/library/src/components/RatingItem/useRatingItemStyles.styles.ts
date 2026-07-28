'use client'; // eslint-disable-line @fluentui/react-components/enforce-use-client -- see NOTE below

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * a converted styles file calls no React hook and no RSC-unsafe function (`makeStyles` is
 * gone), so `enforce-use-client` is right that `'use client'` is now unnecessary. It is
 * kept because migration/griffel-to-tailwind/CONVERSION_GUIDE.md §3 makes a conversion a
 * pure styling change; dropping directives is a Phase 3 sweep across all 180 style hooks.
 *
 * The suppression is a trailing `eslint-disable-line` rather than a leading
 * `eslint-disable` block because a leading block comment pushes `'use client'` off the
 * first line of the emitted lib/lib-commonjs output — every other v9 source file in the
 * repo has the directive at line 1.
 */

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RatingItemSlots, RatingItemState } from './RatingItem.types';

import styles from './RatingItem.module.css';

export const ratingItemClassNames: SlotClassNames<RatingItemSlots> = {
  root: 'fui-RatingItem',
  selectedIcon: 'fui-RatingItem__selectedIcon',
  unselectedIcon: 'fui-RatingItem__unselectedIcon',
  halfValueInput: 'fui-RatingItem__halfValueInput',
  fullValueInput: 'fui-RatingItem__fullValueInput',
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

  // Named group marker FIRST, then the static `fui-*` class (conformance contract), with
  // the consumer className last. The marker is a literal, unhashed, GLOBAL token: it is the
  // only handle by which another module — in this package or any other — can style an
  // element from this RatingItem's state, because `styles.root` is hashed and unaddressable
  // from outside this file. `data-size` is already stamped on this very element above, so
  // `@variant group-size-large/fui-rating-item { … }` works as-is (DECISIONS.md D15,
  // Tier 0 — no state mirrors needed).
  //
  // Cascade priority is decided by the `@layer fui.*` order in RatingItem.module.css, not
  // by the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces, including why `useIndicatorStyles.filled`
  // is split across two blocks there.
  state.root.className = clsx('group/fui-rating-item', ratingItemClassNames.root, styles.root, state.root.className);

  if (state.halfValueInput) {
    state.halfValueInput.className = clsx(
      ratingItemClassNames.halfValueInput,
      styles.input,
      styles['input-lower-half'],
      state.halfValueInput.className,
    );
  }

  if (state.fullValueInput) {
    state.fullValueInput.className = clsx(
      ratingItemClassNames.fullValueInput,
      styles.input,
      state.halfValueInput && styles['input-upper-half'],
      state.fullValueInput.className,
    );
  }

  if (state.unselectedIcon) {
    state.unselectedIcon.className = clsx(
      ratingItemClassNames.unselectedIcon,
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
      ratingItemClassNames.selectedIcon,
      styles.icon,
      color === 'brand' && styles.brand,
      color === 'marigold' && styles.marigold,
      iconFillWidth === 0.5 && styles['icon-lower-half'],
      state.selectedIcon.className,
    );
  }

  return state;
};
