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

  // Named group marker FIRST, consumer className last (the consumer's string is already the
  // tail of `state.root.className` after useDividerStyles_unstable ran). The marker is a
  // literal, unhashed, GLOBAL token: it is the only handle by which another module — in
  // this package or any other — can style an element from this ToolbarDivider's state,
  // because `styles.root` is hashed and unaddressable from outside this file.
  // `data-orientation` is already stamped on this very element above (DECISIONS.md D15,
  // Tier 0 — no state mirrors needed).
  //
  // Unlike the converted leaf hooks there is no static `fui-ToolbarDivider` class to sit
  // beside: this root IS react-divider's root, so the element carries both this marker and
  // react-divider's `group/fui-divider`. That is correct — it genuinely is both.
  //
  // Cascade priority is decided by the `@layer fui.*`
  // order in ToolbarDivider.module.css — `fui.components.l2` for the rules that must beat
  // react-divider's own, `fui.base` for the one `display` declaration that has to lose to
  // it. See that file's header for the mapping back to the mergeClasses() argument order
  // this replaces, including why that single inversion exists.
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx('group/fui-toolbar-divider', styles.root, state.root.className);

  return state;
};
