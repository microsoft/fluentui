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
import type { TreeItemSlots, TreeItemState } from './TreeItem.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { treeItemLevelToken } from '../../utils/tokens';

import styles from './TreeItem.module.css';

export const treeItemClassNames: SlotClassNames<TreeItemSlots> = {
  root: 'fui-TreeItem',
};

type StaticLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type StaticLevelProperty = `level${StaticLevel}`;

/**
 * Apply styling to the TreeItem slots based on the state
 */
export const useTreeItemStyles_unstable = (state: TreeItemState): TreeItemState => {
  const { level } = state;

  // Static `fui-*` class first (conformance contract), then the named group marker — the
  // marker must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1) — with the consumer className last. The marker is a literal,
  // unhashed, GLOBAL token: it is the only handle by which another module — in this package
  // or any other — can style an element from this TreeItem's state, because `styles.root` is
  // hashed and unaddressable from outside this file. This is the package's strongest nesting
  // case: TreeItemLayout and TreeItemPersonaLayout are separate components rendered inside
  // this root, and they can now read the item's expansion directly as
  // `@variant group-expanded/fui-tree-item { … }`.
  //
  // No state mirror is needed. `aria-expanded` is already on this root and the catalog's
  // `expanded` variant matches `[aria-expanded='true']`, so the state a child most wants is
  // readable as-is (DECISIONS.md D15, Tier 0).
  //
  // Cascade priority is decided by the `@layer fui.*` order in TreeItem.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces, including why the focus indicator sits at
  // altitude `fui.components.l2` (it is applied over TreeItemLayout /
  // TreeItemPersonaLayout's own hook output).
  //
  // The ten `level*` classes stay module classes rather than a `data-level` attribute:
  // each carries nothing but the indentation custom property, and keeping the class shape
  // preserves the `level > 10` inline-style fallback contract asserted in TreeItem.test.tsx.
  //
  // The `react-hooks/immutability` suppressions the Griffel version carried are gone: the
  // rule only fired because the assigned values derived from hook calls (`useBaseStyles()`,
  // `useStyles()`), and there are none left here. The state-mutation pattern itself is
  // deliberately kept — the mixed-mode sibling seam and the customStyleHooks contract
  // depend on the shared object, and its removal is a single Phase 3 sweep
  // (DECISIONS.md D14).
  state.root.className = clsx(
    treeItemClassNames.root,
    'group/fui-tree-item',
    styles.root,
    isStaticallyDefinedLevel(level) && styles[`level${level}` as StaticLevelProperty],
    state.root.className,
  );

  // For levels beyond the statically generated classes (> 10), fall back to an
  // inline style that sets the indentation CSS variable dynamically. This avoids
  // generating an unbounded number of atomic classes while still supporting
  // arbitrarily deep trees. User-provided inline styles take precedence.
  if (!isStaticallyDefinedLevel(level)) {
    state.root.style = {
      [treeItemLevelToken]: level,
      ...state.root.style,
    };
  }

  return state;
};

function isStaticallyDefinedLevel(level: number): level is StaticLevel {
  return level >= 1 && level <= 10;
}
