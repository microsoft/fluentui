'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useButtonStyles_unstable } from '../Button/useButtonStyles.styles.css';
import type { ButtonSlots } from '../Button/Button.types';
import type { ToggleButtonState } from './ToggleButton.types';
import styles from './ToggleButton.module.css';

export const toggleButtonClassNames: SlotClassNames<ButtonSlots> = {
  root: 'fui-ToggleButton',
  icon: 'fui-ToggleButton__icon',
};

export const useToggleButtonStyles_unstable = (state: ToggleButtonState): ToggleButtonState => {
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    toggleButtonClassNames.root,
    styles[state.appearance],
    state.checked && styles.checked,
    state.isAccessible && styles.isAccessible,
    (state.disabled || state.disabledFocusable) && styles.disabled,
    state.root.className,
  );
  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(toggleButtonClassNames.icon, styles.icon, state.icon.className);
  }

  useButtonStyles_unstable(state);
  return state;
};
