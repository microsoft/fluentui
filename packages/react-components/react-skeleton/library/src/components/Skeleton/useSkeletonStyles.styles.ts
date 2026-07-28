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
import type { SkeletonSlots, SkeletonState } from './Skeleton.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

import styles from './Skeleton.module.css';

export const skeletonClassNames: SlotClassNames<SkeletonSlots> = {
  root: 'fui-Skeleton',
};

/**
 * Apply styling to the Skeleton slots based on the state
 */
export const useSkeletonStyles_unstable = (state: SkeletonState): SkeletonState => {
  // Static `fui-*` class first (conformance contract), then the named group marker — the
  // marker must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under jsdom;
  // DECISIONS.md D15.1) — with the consumer className last. The marker is a literal,
  // unhashed, GLOBAL token: it is the only handle by which another module — in this package
  // or any other — can style an element from this Skeleton's state, because
  // `styles['block-styling']` is hashed and unaddressable from outside this file. It is what
  // lets SkeletonItem.module.css (or a consumer's module) key off "inside a Skeleton" at all
  // (DECISIONS.md D15).
  //
  // Cascade priority is decided by the `@layer fui.*` order in Skeleton.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  //
  // Skeleton stamps no data attributes: `animation`, `appearance`, `size` and `shape` are
  // carried to the SkeletonItems through SkeletonContext (useSkeletonContextValues), and
  // the wrapper itself renders no visual of its own.
  //
  // The `react-hooks/immutability` disable the Griffel version carried is gone: the rule
  // no longer reports here, and the state-mutation pattern itself stays until the Phase 3
  // sweep (DECISIONS.md D14) — this is only the now-unused directive.
  state.root.className = clsx(
    skeletonClassNames.root,
    'group/fui-skeleton',
    state.root.as === 'span' && styles['block-styling'],
    state.root.className,
  );

  return state;
};
