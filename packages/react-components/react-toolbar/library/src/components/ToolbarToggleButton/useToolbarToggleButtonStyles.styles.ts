'use client';

/*
 * NOTE on the directive above:
 * this file keeps `'use client'` because it still calls `useToggleButtonStyles_unstable`,
 * so `enforce-use-client` sees a hook call and never reports the directive as unnecessary.
 * Same as useToolbarButtonStyles.styles.ts.
 *
 * Both slices here restyle @fluentui/react-button's <ToggleButton>. Both sides are layered
 * now, so the two altitudes compare deterministically; ToolbarToggleButton.module.css
 * documents exactly how.
 */

import { clsx } from 'clsx';
import { useToggleButtonStyles_unstable } from '@fluentui/react-button';
import type { ToolbarToggleButtonState } from './ToolbarToggleButton.types';

import styles from './ToolbarToggleButton.module.css';

/**
 * Apply styling to the ToolbarToggleButton slots based on the state
 */
export const useToolbarToggleButtonStyles_unstable = (state: ToolbarToggleButtonState): ToolbarToggleButtonState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
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
