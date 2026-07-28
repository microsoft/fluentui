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
import type { ListSlots, ListState } from './List.types';

import styles from './List.module.css';

export const listClassNames: SlotClassNames<ListSlots> = {
  root: 'fui-List',
};

/**
 * Apply styling to the List slots based on the state.
 *
 * List has no enum or state slices — its entire Griffel definition was one
 * `makeResetStyles`, now `@layer fui.base` in List.module.css — so no data attributes are
 * stamped here.
 */
export const useListStyles_unstable = (state: ListState): ListState => {
  // Static `fui-*` class first (conformance contract), consumer className last.
  // Cascade priority is decided by the `@layer fui.*` order in List.module.css, not by the
  // order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  state.root.className = clsx(listClassNames.root, styles.root, state.root.className);

  return state;
};
