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
import type { InteractionTagSlots, InteractionTagState } from './InteractionTag.types';

import styles from './InteractionTag.module.css';

export const interactionTagClassNames: SlotClassNames<InteractionTagSlots> = {
  root: 'fui-InteractionTag',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `size` is a small ENUM scale, so it takes the catalog's `size-*` variants
 * (DECISIONS.md D3). `shape` stays a conditional CLASS in the composition below, the
 * same way `rootStyles[shape]` was a conditional mergeClasses argument.
 */
type InteractionTagRootDataAttributes = {
  'data-size': InteractionTagState['size'];
};

/**
 * Apply styling to the InteractionTag slots based on the state
 */
export const useInteractionTagStyles_unstable = (state: InteractionTagState): InteractionTagState => {
  const { shape, size } = state;

  const root = state.root as InteractionTagState['root'] & InteractionTagRootDataAttributes;

  root['data-size'] = size;

  // Static `fui-*` class first (conformance contract), then the named group marker — the
  // marker must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1) — with the consumer className last. The marker is a literal,
  // unhashed, GLOBAL token: it is the only handle by which another module — in this package
  // or any other — can style an element from this InteractionTag's state, because
  // `styles.root` is hashed and unaddressable from outside this file. This is the strongest
  // nesting case in the package: InteractionTagPrimary and InteractionTagSecondary are
  // separate components rendered INSIDE this root, so they can now read it as
  // `@variant group-hover/fui-interaction-tag { … }` (DECISIONS.md D15).
  //
  // Cascade priority is decided by the `@layer fui.*` order in InteractionTag.module.css,
  // not by the order of these arguments — see that file's header for the mapping back to
  // the mergeClasses() argument order this replaces.
  state.root.className = clsx(
    interactionTagClassNames.root,
    'group/fui-interaction-tag',
    styles.root,
    styles[shape],
    state.root.className,
  );

  return state;
};
