'use client';

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * unlike the converted leaf hooks (Toolbar, ToolbarGroup), this file needs NO
 * `enforce-use-client` suppression: it still calls `useDividerStyles_unstable`, so the rule
 * agrees the directive is required. Converted hooks that call nothing carry a trailing
 * `eslint-disable-line` instead — see useToolbarStyles.styles.ts.
 */

import { clsx } from 'clsx';
import { useDividerStyles_unstable } from '@fluentui/react-divider';
import type { ToolbarDividerState } from './ToolbarDivider.types';

import styles from './ToolbarDivider.module.css';

/**
 * Data attribute rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `useDividerStyles_unstable` — called on the line above the assignment — already writes
 * the identical value from the same `state.vertical`. Re-stamping is idempotent and keeps
 * ToolbarDivider.module.css's selectors from silently depending on another package's
 * stamping.
 */
type ToolbarDividerRootDataAttributes = {
  'data-orientation': 'horizontal' | 'vertical';
};

/**
 * Apply styling to the ToolbarDivider slots based on the state
 */
export const useToolbarDividerStyles_unstable = (state: ToolbarDividerState): ToolbarDividerState => {
  useDividerStyles_unstable(state);

  const { vertical } = state;

  const root = state.root as ToolbarDividerState['root'] & ToolbarDividerRootDataAttributes;

  // The state-mutation pattern is PRESERVED during conversion (CONVERSION_GUIDE §3,
  // DECISIONS.md D14): the mixed-mode sibling seam and the customStyleHooks contract both
  // depend on the shared object. Its removal is a single Phase 3 sweep.
  // eslint-disable-next-line react-hooks/immutability
  root['data-orientation'] = vertical ? 'vertical' : 'horizontal';

  // Consumer className last (it is already the tail of `state.root.className` after
  // useDividerStyles_unstable ran). Cascade priority is decided by the `@layer fui.*`
  // order in ToolbarDivider.module.css — `fui.components.l2` for the rules that must beat
  // react-divider's own, `fui.base` for the one `display` declaration that has to lose to
  // it. See that file's header for the mapping back to the mergeClasses() argument order
  // this replaces, including why that single inversion exists.
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(styles.root, state.root.className);

  return state;
};
