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
import type { TreeSlots, TreeState } from './Tree.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

import styles from './Tree.module.css';

export const treeClassNames: SlotClassNames<Omit<TreeSlots, 'collapseMotion'>> = {
  root: 'fui-Tree',
};

export const useTreeStyles_unstable = (state: TreeState): TreeState => {
  const isSubTree = state.level > 1;

  // Static `fui-*` class first (conformance contract), consumer className last.
  // Cascade priority is decided by the `@layer fui.*` order in Tree.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  //
  // The `react-hooks/immutability` suppression the Griffel version carried is gone: the
  // rule only fired because the assigned value derived from a hook call (`useBaseStyles()`),
  // and there are none left here. The state-mutation pattern itself is deliberately kept —
  // the mixed-mode sibling seam and the customStyleHooks contract depend on the shared
  // object, and its removal is a single Phase 3 sweep (DECISIONS.md D14).
  state.root.className = clsx(treeClassNames.root, styles.root, isSubTree && styles.subtree, state.root.className);
  return state;
};
