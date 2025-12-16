'use client';

import type { SlotClassNames } from '@fluentui/react-utilities';
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

  const { appearance, disabled, disabledFocusable, shape, size, checked, iconOnly } = state;

  state.root.className = [
    toggleButtonClassNames.root,

    // Appearance
    appearance && `${toggleButtonClassNames.root}--${appearance}`,

    // Size
    size && `${toggleButtonClassNames.root}--${size}`,

    // Shape
    shape && `${toggleButtonClassNames.root}--${shape}`,

    // Checked
    checked && `${toggleButtonClassNames.root}--checked`,

    // Icons
    iconOnly && `${toggleButtonClassNames.root}--iconOnly`,

    // Disabled
    disabled && `${toggleButtonClassNames.root}--disabled`,
    disabledFocusable && `${toggleButtonClassNames.root}--disabledFocusable`,

    // User provided class name
    state.root.className,
  ]
    .filter(Boolean)
    .join(' ');

  if (state.icon) {
    state.icon.className = [toggleButtonClassNames.icon, state.icon.className].filter(Boolean).join(' ');
  }

  return state;
};
