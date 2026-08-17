import { clsx } from 'clsx';
import type { CardPreviewState } from './CardPreview.types';

import styles from './CardPreview.module.css';

/**
 * CardPreview's public identity class — the Tailwind named-group marker
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
export const cardPreviewClassNames: { root: string } = {
  root: 'group/fui-card-preview',
};

/**
 * Apply styling to the CardPreview slots based on the state.
 */
export const useCardPreviewStyles_unstable = (state: CardPreviewState): CardPreviewState => {
  // Module class first, then the named group marker — the marker must never be
  // `classList[0]` (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md
  // D15.1 / D16.2) — with the consumer className last. `styles.root` is unconditional, so
  // index 0 is always the hashed, selector-safe class. The marker is a literal,
  // unhashed, GLOBAL token: it is the only handle by which another module — in this package
  // or any other — can style an element from this preview's state, because `styles.root` is
  // hashed and unaddressable from outside this file. Read it as
  // `@variant group-…/fui-card-preview { … }` (DECISIONS.md D15). Only the root slot carries
  // a marker; `logo` does not.
  //
  // Cascade priority is decided by the `@layer fui.*` order in CardPreview.module.css and
  // by block order within it, not by the order of these arguments — see that file's header
  // for the mapping back to the mergeClasses() argument order this replaces.
  //
  // The state mutation below is preserved deliberately: DECISIONS.md D14 defers the
  // pure-builder rewrite to a single Phase 3 sweep.
  state.root.className = clsx(styles.root, cardPreviewClassNames.root, state.root.className);

  if (state.logo) {
    state.logo.className = clsx(styles.logo, state.logo.className);
  }

  return state;
};
