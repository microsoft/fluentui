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
import type { SkeletonItemSlots, SkeletonItemState } from './SkeletonItem.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

import styles from './SkeletonItem.module.css';

export const skeletonItemClassNames: SlotClassNames<SkeletonItemSlots> = {
  root: 'fui-SkeletonItem',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `size` is the one prop that rides an attribute rather than a module class: it is a
 * scale prop, not a look prop (DECISIONS.md D3), and the catalog's `data-size` gains this
 * component's numeric scale (`size-8` … `size-128`) next to Button's `size-small|medium|
 * large`. `animation`, `appearance` and `shape` are look props and stay class lookups.
 *
 * `size` is always defined on the state (`useSkeletonItem_unstable` defaults it to the
 * context value or `16`), so the attribute is unconditional — no `|| undefined` presence
 * form is needed here.
 */
type SkeletonItemRootDataAttributes = {
  'data-size': SkeletonItemState['size'];
};

/**
 * Apply styling to the SkeletonItem slots based on the state
 */
export const useSkeletonItemStyles_unstable = (state: SkeletonItemState): SkeletonItemState => {
  const { animation, appearance, size, shape } = state;

  const root = state.root as SkeletonItemState['root'] & SkeletonItemRootDataAttributes;

  root['data-size'] = size;

  // Static `fui-*` class first (conformance contract), consumer className last.
  // Cascade priority is decided by the `@layer fui.*` order in SkeletonItem.module.css,
  // not by the order of these arguments — see that file's header for the mapping back to
  // the mergeClasses() argument order this replaces, including the media-query bucket
  // rule that keeps `prefers-reduced-motion` beating the pulse animation duration.
  //
  // `styles[animation]` covers the mutually exclusive `wave` / `pulse` slices in one
  // lookup. `styles[appearance]` resolves to `undefined` for `opaque` — that slice does
  // not exist in Griffel either, and clsx drops the falsy argument exactly as
  // mergeClasses dropped the `false` one.
  //
  // The `react-hooks/immutability` disables the Griffel version carried are gone: the rule
  // no longer reports here, and the state-mutation pattern itself stays until the Phase 3
  // sweep (DECISIONS.md D14) — only the now-unused directives were dropped.
  state.root.className = clsx(
    skeletonItemClassNames.root,
    styles.root,
    state.root.as === 'span' && styles.blockStyling,
    styles[animation],
    styles[appearance],
    animation === 'pulse' && appearance === 'translucent' && styles.translucentPulse,
    styles[shape],
    state.root.className,
  );

  return state;
};
