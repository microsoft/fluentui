import { clsx } from 'clsx';
import type { RatingState } from './Rating.types';

import styles from './Rating.module.css';

/**
 * Public identity classes for Rating.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (`migration/griffel-to-tailwind/reports/DECISIONS.md`,
 * D15.1 / D16.5) — usable as a selector and as a `group-*` variant target.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + ratingClassNames.root` is invalid. Use `fuiSelector()` from
 * `@fluentui/react-utilities` (or `@fluentui/react-components`) at every selector site.
 */
export const ratingClassNames: { root: string } = {
  root: 'group/fui-rating',
};

/**
 * Apply styling to the Rating slots based on the state
 */
export const useRatingStyles_unstable = (state: RatingState): RatingState => {
  // `styles.root` first, then the named group marker — the marker must never be
  // `classList[0]` (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md
  // D15.1 / D16.2) — with the consumer className last. `styles.root` is unconditional and
  // `clsx` never drops it, so index 0 is always the hashed, selector-safe module class; the
  // BEM static that used to hold that position was removed in D16.1. The marker is a
  // literal, unhashed, GLOBAL token: it is the only handle by which another module — in
  // this package or any other — can style an element from this Rating's state, because
  // `styles.root` is hashed and unaddressable from outside this file. Read it as
  // `@variant group-hover/fui-rating { … }` (DECISIONS.md D15).
  //
  // Cascade priority is decided by the `@layer fui.*` order in Rating.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  state.root.className = clsx(styles.root, 'group/fui-rating', state.root.className);

  return state;
};
