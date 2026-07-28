'use client';

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * unlike the converted leaf hooks (Toolbar, ToolbarGroup) this file needs NO
 * `enforce-use-client` suppression — it still calls `useToggleButtonStyles_unstable`, so
 * the rule agrees the directive is required. Same as useToolbarButtonStyles.styles.ts.
 *
 * Held back until @fluentui/react-button's ToggleButton converted, for the reason
 * ToolbarToggleButton/useToolbarToggleButtonStyles.styles.ts documents.
 */

import { clsx } from 'clsx';
import { useToggleButtonStyles_unstable } from '@fluentui/react-button';
import type { ToolbarRadioButtonState } from './ToolbarRadioButton.types';

import styles from './ToolbarRadioButton.module.css';

/**
 * Apply styling to the ToolbarRadioButton slots based on the state
 */
export const useToolbarRadioButtonStyles_unstable = (state: ToolbarRadioButtonState): ToolbarRadioButtonState => {
  // Named group marker, then the module class, consumer className last. `clsx` order here
  // is per-argument within THIS call; the ToggleButton hook runs afterwards and PREPENDS
  // `fui-ToggleButton`, so the rendered `classList[0]` is a selector-safe token and the
  // D15.1 invariant holds on the string that reaches the DOM. Cascade priority is decided
  // by the `@layer fui.*` order in ToolbarRadioButton.module.css.
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx('group/fui-toolbar-radio-button', state.checked && styles.selected, state.root.className);

  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(state.checked && styles['icon-selected'], state.icon.className);
  }

  // Called LAST, exactly as before — see ToolbarToggleButton's hook for why the call order
  // still has to stand now that the layer altitude decides the winner.
  useToggleButtonStyles_unstable(state);

  return state;
};
