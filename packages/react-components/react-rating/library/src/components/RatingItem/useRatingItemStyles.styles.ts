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

  // Static `fui-*` class first (conformance contract), consumer className last.
  // Cascade priority is decided by the `@layer fui.*` order in RatingItem.module.css, not
  // by the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces, including why `useIndicatorStyles.filled`
  // is split across two blocks there.
  state.root.className = clsx(ratingItemClassNames.root, styles.root, state.root.className);

  if (state.halfValueInput) {
    state.halfValueInput.className = clsx(
      ratingItemClassNames.halfValueInput,
      styles.input,
      styles.inputLowerHalf,
      state.halfValueInput.className,
    );
  }

  if (state.fullValueInput) {
    state.fullValueInput.className = clsx(
      ratingItemClassNames.fullValueInput,
      styles.input,
      state.halfValueInput && styles.inputUpperHalf,
      state.fullValueInput.className,
    );
  }

  if (state.unselectedIcon) {
    state.unselectedIcon.className = clsx(
      ratingItemClassNames.unselectedIcon,
      styles.icon,
      appearance === 'filled' && styles.filled,
      color === 'brand' && (appearance === 'filled' ? styles.brandFilled : styles.brand),
      color === 'marigold' && (appearance === 'filled' ? styles.marigoldFilled : styles.marigold),
      iconFillWidth === 0.5 && styles.iconUpperHalf,
      state.unselectedIcon.className,
    );
  }

  if (state.selectedIcon) {
    state.selectedIcon.className = clsx(
      ratingItemClassNames.selectedIcon,
      styles.icon,
      color === 'brand' && styles.brand,
      color === 'marigold' && styles.marigold,
      iconFillWidth === 0.5 && styles.iconLowerHalf,
      state.selectedIcon.className,
    );
  }

  return state;
};
