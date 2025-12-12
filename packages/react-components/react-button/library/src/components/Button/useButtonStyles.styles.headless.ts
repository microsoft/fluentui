'use client';

import { getComponentSlotClassName, type SlotClassNames } from '@fluentui/react-utilities';
import type { ButtonSlots, ButtonState } from './Button.types';

export const buttonClassNames: SlotClassNames<ButtonSlots> = {
  root: 'fui-Button',
  icon: 'fui-Button__icon',
};

/**
 * Attaches only semantic slot class names and state modifiers
 */
export const useButtonStyles_unstable = (state: ButtonState): ButtonState => {
  'use no memo';

  state.root.className = getComponentSlotClassName(buttonClassNames.root, state.root, state);

  if (state.icon) {
    state.icon.className = getComponentSlotClassName(buttonClassNames.icon, state.icon);
  }

  return state;
};
