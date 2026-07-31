'use client';

/*
 * NOTE on the directive above:
 * this file keeps `'use client'` because it still calls `useToggleButtonStyles_unstable`,
 * so `enforce-use-client` sees a hook call and never reports the directive as unnecessary.
 * Same as useToolbarButtonStyles.styles.ts.
 */

import { clsx } from 'clsx';
import { useToggleButtonStyles_unstable } from '@fluentui/react-button';
import type { ToolbarRadioButtonState } from './ToolbarRadioButton.types';

import styles from './ToolbarRadioButton.module.css';

/**
 * Apply styling to the ToolbarRadioButton slots based on the state
 */
export const useToolbarRadioButtonStyles_unstable = (state: ToolbarRadioButtonState): ToolbarRadioButtonState => {
  // Named group marker, then the (conditional) module class, consumer className last. `clsx`
  // order here is per-argument within THIS call; the ToggleButton hook runs afterwards and
  // PREPENDS its own arguments, and react-button's Button hook prepends an unconditional
  // hashed `styles.root` after that — so the rendered `classList[0]` is selector-safe and the
  // D15.1 invariant holds on the string that reaches the DOM. That is now guaranteed by the
  // module class rather than by the `fui-ToggleButton` static, which D16.1 removed; it is
  // asserted by the shared `component-has-group-marker` test, to which ToolbarRadioButton.test.tsx
  // declares all THREE markers (button, toggle-button, toolbar-radio-button) through
  // `testOptions['has-group-marker'].markers` (D16.3).
  //
  // Cascade priority is decided by the `@layer fui.*` order in ToolbarRadioButton.module.css.
  state = {
    ...state,
    root: {
      ...state.root,
      className: clsx('group/fui-toolbar-radio-button', state.checked && styles.selected, state.root.className),
    },
  };

  if (state.icon) {
    state = {
      ...state,
      icon: { ...state.icon, className: clsx(state.checked && styles['icon-selected'], state.icon.className) },
    };
  }

  // Called LAST, exactly as before — see ToolbarToggleButton's hook for why the call order
  // still has to stand now that the layer altitude decides the winner.
  // ToolbarRadioButtonState widens ToggleButtonState with `name` / `value`, so the delegate's
  // narrower return is re-merged onto this component's own shape (F1 of the D14 mutation removal
  // — thread the composed result, do not discard it).
  state = { ...state, ...useToggleButtonStyles_unstable(state) };

  return state;
};
