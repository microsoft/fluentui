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
import type { RatingDisplaySlots, RatingDisplayState } from './RatingDisplay.types';

import styles from './RatingDisplay.module.css';

export const ratingDisplayClassNames: SlotClassNames<RatingDisplaySlots> = {
  root: 'fui-RatingDisplay',
  valueText: 'fui-RatingDisplay__valueText',
  countText: 'fui-RatingDisplay__countText',
};

/**
 * Data attribute rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `size` is a scale prop, so it rides a data-attribute rather than a module class
 * (DECISIONS.md D3), and it is stamped on the ROOT even though the rules it selects apply
 * to the `valueText` / `countText` slots: those slots are the root's direct children
 * (renderRatingDisplay), so one stamp drives both descendant rules — the same approach as
 * react-switch's root-level `data-size`.
 *
 * It is written unconditionally. Only `large` and `extra-large` carry rules (the Griffel
 * source has no `small` / `medium` slice — those values live in the `.label` reset), but
 * the attribute names the whole value space and is inert for the other two.
 */
type RatingDisplayRootDataAttributes = {
  'data-size': RatingDisplayState['size'];
};

/**
 * Apply styling to the RatingDisplay slots based on the state
 */
export const useRatingDisplayStyles_unstable = (state: RatingDisplayState): RatingDisplayState => {
  const { size } = state;

  const root = state.root as RatingDisplayState['root'] & RatingDisplayRootDataAttributes;

  root['data-size'] = size;

  // Named group marker FIRST, then the static `fui-*` class (conformance contract), with
  // the consumer className last. The marker is a literal, unhashed, GLOBAL token: it is the
  // only handle by which another module — in this package or any other — can style an
  // element from this RatingDisplay's state, because `styles.root` is hashed and
  // unaddressable from outside this file. `data-size` is already stamped on this very
  // element above, so `@variant group-size-large/fui-rating-display { … }` works as-is
  // (DECISIONS.md D15, Tier 0 — no state mirrors needed).
  //
  // Cascade priority is decided by the `@layer fui.*` order in RatingDisplay.module.css,
  // not by the order of these arguments — see that file's header for the mapping back to
  // the mergeClasses() argument order this replaces.
  state.root.className = clsx(
    'group/fui-rating-display',
    ratingDisplayClassNames.root,
    styles.root,
    state.root.className,
  );

  if (state.valueText) {
    state.valueText.className = clsx(
      ratingDisplayClassNames.valueText,
      styles.label,
      styles.strong,
      state.valueText.className,
    );
  }

  if (state.countText) {
    state.countText.className = clsx(
      ratingDisplayClassNames.countText,
      styles.label,
      // The "· " separator is only drawn when a valueText precedes the count.
      state.valueText && styles.divider,
      state.countText.className,
    );
  }

  return state;
};
