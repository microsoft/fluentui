'use client';

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * unlike the converted leaf hooks (Toolbar, ToolbarGroup) this file needs NO
 * `enforce-use-client` suppression — it still calls `useToggleButtonStyles_unstable`, so
 * the rule agrees the directive is required. Same as useToolbarButtonStyles.styles.ts.
 *
 * This file was the last Griffel holdout in react-toolbar (reports/phase2-batch3.md,
 * "Deliberate scope leftovers"): both slices restyle @fluentui/react-button's
 * <ToggleButton>, whose own styles hook was still `makeStyles` + `mergeClasses`, and
 * Griffel injects UNLAYERED — no layered rule can beat that (DECISIONS.md D2 amendment 5).
 * ToggleButton is converted now, so the two altitudes can be compared deterministically;
 * ToolbarToggleButton.module.css documents exactly how.
 */

import { clsx } from 'clsx';
import { useToggleButtonStyles_unstable } from '@fluentui/react-button';
import type { ToolbarToggleButtonState } from './ToolbarToggleButton.types';

import styles from './ToolbarToggleButton.module.css';

/**
 * Apply styling to the ToolbarToggleButton slots based on the state
 */
export const useToolbarToggleButtonStyles_unstable = (state: ToolbarToggleButtonState): ToolbarToggleButtonState => {
  // Named group marker, then the module class, consumer className last.
  //
  // There is no unconditional module class here to lead with: this root IS react-button's
  // ToggleButton root, and `useToggleButtonStyles_unstable` (called below) contributes
  // `group/fui-toggle-button`, then `useButtonStyles_unstable` adds `group/fui-button`, all
  // to the same element. Three markers on one element is correct — it genuinely is all three
  // things, and a descendant can address whichever identity it means. All three are declared to
  // react-conformance's `component-has-group-marker` through
  // `testOptions['has-group-marker'].markers` in ToolbarToggleButton.test.tsx (D16.3), so that
  // test runs here as an exact set comparison.
  //
  // Ordering here is per-argument within THIS clsx; because the ToggleButton hook runs
  // afterwards and PREPENDS its own arguments — and Button's hook, last in the chain,
  // prepends an unconditional hashed `styles.root` — the rendered `classList[0]` is that
  // hashed class and the D15.1 invariant (the marker is never the first class token; nwsapi's
  // `:scope` polyfill throws on the `/` under jsdom) holds on the string that actually
  // reaches the DOM. Before D16.1 the `fui-ToggleButton` static held that position instead.
  // Same reasoning as ToolbarButton's hook.
  //
  // Cascade priority is decided by the `@layer fui.*` order in
  // ToolbarToggleButton.module.css — everything is `fui.components.l2`, and the root rule
  // additionally compounds ToggleButton's marker and restricts itself to the rest state so
  // that ToggleButton's own hover/pressed rules keep winning. See that file's header.
  state = {
    ...state,
    root: {
      ...state.root,
      className: clsx('group/fui-toolbar-toggle-button', state.checked && styles.selected, state.root.className),
    },
  };

  if (state.icon) {
    state = {
      ...state,
      icon: { ...state.icon, className: clsx(state.checked && styles['icon-selected'], state.icon.className) },
    };
  }

  // Called LAST, exactly as before: `useToggleButtonStyles_unstable` composes its own
  // classes ahead of the incoming className, which is what made ToolbarToggleButton win
  // under Griffel. The layer altitude reproduces that winner now, but the call order still
  // has to stand so the consumer className stays last in the rendered class attribute.
  // ToolbarToggleButtonState widens ToggleButtonState with `name` / `value`, so the delegate's
  // narrower return is re-merged onto this component's own shape (F1 of the D14 mutation removal
  // — thread the composed result, do not discard it).
  state = { ...state, ...useToggleButtonStyles_unstable(state) };

  return state;
};
