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
  state = useDividerStyles_unstable(state);

  const { vertical } = state;

  const rootDataAttributes: ToolbarDividerRootDataAttributes = {
    'data-orientation': vertical ? 'vertical' : 'horizontal',
  };

  // Module class first, then the named group marker, consumer className last (the
  // consumer's string is already the tail of `state.root.className` after
  // useDividerStyles_unstable ran). The marker must never be `classList[0]` (nwsapi's
  // `:scope` polyfill throws on it under jsdom; DECISIONS.md D15.1). The marker is a
  // literal, unhashed, GLOBAL token: it is the only handle by which another module — in
  // this package or any other — can style an element from this ToolbarDivider's state,
  // because `styles.root` is hashed and unaddressable from outside this file.
  // `data-orientation` is already stamped on this very element above (DECISIONS.md D15,
  // Tier 0 — no state mirrors needed).
  //
  // This root IS react-divider's root, so the element carries both this marker and
  // react-divider's `group/fui-divider`. That is correct — it genuinely is both, and it is
  // why this component declares BOTH markers to react-conformance's
  // `component-has-group-marker` through `testOptions['has-group-marker'].markers` (D16.3),
  // which keeps that test running here as an exact set comparison. `styles.root` is unconditional and leads this call, so `classList[0]` is a
  // hashed, selector-safe token even though react-divider's `fui-Divider` static is gone
  // (D16.1).
  //
  // Cascade priority is decided by the `@layer fui.*`
  // order in ToolbarDivider.module.css — `fui.components.l2` for the rules that must beat
  // react-divider's own, `fui.base` for the one `display` declaration that has to lose to
  // it. See that file's header for the mapping back to the mergeClasses() argument order
  // this replaces, including why that single inversion exists.
  state = {
    ...state,
    root: {
      ...state.root,
      ...rootDataAttributes,
      className: clsx(styles.root, 'group/fui-toolbar-divider', state.root.className),
    },
  };

  return state;
};
