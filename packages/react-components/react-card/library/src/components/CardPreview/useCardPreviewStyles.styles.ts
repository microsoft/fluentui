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
import type { CardPreviewSlots, CardPreviewState } from './CardPreview.types';

import styles from './CardPreview.module.css';

/**
 * Static CSS class names used internally for the component slots.
 */
export const cardPreviewClassNames: SlotClassNames<CardPreviewSlots> = {
  root: 'fui-CardPreview',
  logo: 'fui-CardPreview__logo',
};

/**
 * Apply styling to the CardPreview slots based on the state.
 */
export const useCardPreviewStyles_unstable = (state: CardPreviewState): CardPreviewState => {
  // Static `fui-*` class first (conformance contract), then the named group marker — the
  // marker must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1) — with the consumer className last. The marker is a literal,
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
  state.root.className = clsx(cardPreviewClassNames.root, 'group/fui-card-preview', styles.root, state.root.className);

  if (state.logo) {
    state.logo.className = clsx(cardPreviewClassNames.logo, styles.logo, state.logo.className);
  }

  return state;
};
