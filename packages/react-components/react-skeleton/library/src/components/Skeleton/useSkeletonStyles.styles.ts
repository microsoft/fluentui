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
  // Static `fui-*` class first (conformance contract), consumer className last.
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
    state.root.as === 'span' && styles.blockStyling,
    state.root.className,
  );

  return state;
};
