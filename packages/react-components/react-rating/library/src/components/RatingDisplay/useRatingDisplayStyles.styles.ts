import { clsx } from 'clsx';
import type { RatingDisplayState } from './RatingDisplay.types';

import styles from './RatingDisplay.module.css';

/**
 * Public identity classes for RatingDisplay.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (`migration/griffel-to-tailwind/reports/DECISIONS.md`,
 * D15.1 / D16.5) — usable as a selector and as a `group-*` variant target. The per-slot keys
 * (`valueText`, `countText`) were removed: there is no public class-name handle on component
 * internals any more.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + ratingDisplayClassNames.root` is invalid. Use `fuiSelector()` from
 * `@fluentui/react-utilities` (or `@fluentui/react-components`) at every selector site.
 */
export const ratingDisplayClassNames: { root: string } = {
  root: 'group/fui-rating-display',
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

  // `styles.root` first, then the named group marker — the marker must never be
  // `classList[0]` (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md
  // D15.1 / D16.2) — with the consumer className last. `styles.root` is unconditional and
  // `clsx` never drops it, so index 0 is always the hashed, selector-safe module class; the
  // BEM static that used to hold that position was removed in D16.1. The marker is a
  // literal, unhashed, GLOBAL token: it is the only handle by which another module — in
  // this package or any other — can style an element from this RatingDisplay's state,
  // because `styles.root` is hashed and unaddressable from outside this file. `data-size`
  // is already stamped on this very element above, so
  // `@variant group-size-large/fui-rating-display { … }` works as-is (DECISIONS.md D15,
  // Tier 0 — no state mirrors needed).
  //
  // Cascade priority is decided by the `@layer fui.*` order in RatingDisplay.module.css,
  // not by the order of these arguments — see that file's header for the mapping back to
  // the mergeClasses() argument order this replaces.
  state.root.className = clsx(styles.root, 'group/fui-rating-display', state.root.className);

  if (state.valueText) {
    state.valueText.className = clsx(styles.label, styles.strong, state.valueText.className);
  }

  if (state.countText) {
    state.countText.className = clsx(
      styles.label,
      // The "· " separator is only drawn when a valueText precedes the count.
      state.valueText && styles.divider,
      state.countText.className,
    );
  }

  return state;
};
