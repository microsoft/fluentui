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
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
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
