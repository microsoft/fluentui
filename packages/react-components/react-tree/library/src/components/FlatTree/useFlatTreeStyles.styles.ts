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
import type { FlatTreeSlots, FlatTreeState } from './FlatTree.types';

import styles from './FlatTree.module.css';

export const flatTreeClassNames: SlotClassNames<Omit<FlatTreeSlots, 'collapseMotion'>> = {
  root: 'fui-FlatTree',
};

export const useFlatTreeStyles_unstable = (state: FlatTreeState): FlatTreeState => {
  // Named group marker FIRST, then the static `fui-*` class (conformance contract), with
  // the consumer className last. The marker is a literal, unhashed, GLOBAL token: it is the
  // only handle by which another module — in this package or any other — can style an
  // element from this FlatTree's state, because `styles.root` is hashed and unaddressable
  // from outside this file. FlatTree gets its own name rather than sharing `fui-tree`: the
  // two are distinct components with distinct roots, and a descendant that means "only
  // inside a flat tree" must be able to say so (DECISIONS.md D15, Tier 0 — no state
  // mirrors needed).
  //
  // Cascade priority is decided by the `@layer fui.*` order in FlatTree.module.css, not
  // by the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  //
  // The `react-hooks/immutability` suppression the Griffel version carried is gone: the
  // rule only fired because the assigned value derived from a hook call (`useBaseStyles()`),
  // and there are none left here. The state-mutation pattern itself is deliberately kept —
  // the mixed-mode sibling seam and the customStyleHooks contract depend on the shared
  // object, and its removal is a single Phase 3 sweep (DECISIONS.md D14).
  state.root.className = clsx('group/fui-flat-tree', flatTreeClassNames.root, styles.root, state.root.className);
  return state;
};
