'use client';

import { getComponentSlotClassName, type SlotClassNames } from '@fluentui/react-utilities';
import type { ButtonSlots } from '../Button/Button.types';
import type { ToggleButtonState } from './ToggleButton.types';

export const toggleButtonClassNames: SlotClassNames<ButtonSlots> = {
  root: 'fui-ToggleButton',
  icon: 'fui-ToggleButton__icon',
};

/**
 * Attaches only semantic slot class names and state modifiers
 */
export const useToggleButtonStyles_unstable = (state: ToggleButtonState): ToggleButtonState => {
  'use no memo';

  state.root.className = getComponentSlotClassName(toggleButtonClassNames.root, state.root, state);

  if (state.icon) {
    state.icon.className = getComponentSlotClassName(toggleButtonClassNames.icon, state.icon);
  }

  return state;
};
