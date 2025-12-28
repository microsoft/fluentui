'use client';

import type { SlotClassNames } from '@fluentui/react-utilities';
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

  const { appearance, disabled, disabledFocusable, icon, iconOnly, iconPosition, shape, size } = state;

  state.root.className = [
    buttonClassNames.root,

    // Appearance
    appearance && `${buttonClassNames.root}--${appearance}`,

    // Size
    `${buttonClassNames.root}--${size}`,

    // Shape
    `${buttonClassNames.root}--${shape}`,

    // Disabled styles
    disabled && `${buttonClassNames.root}--disabled`,
    disabledFocusable && `${buttonClassNames.root}--disabledFocusable`,

    // Icon styles
    icon && iconPosition === 'before' && `${buttonClassNames.root}--iconBefore`,
    icon && iconPosition === 'after' && `${buttonClassNames.root}--iconAfter`,
    iconOnly && `${buttonClassNames.root}--iconOnly`,

    // User provided class name
    state.root.className,
  ]
    .filter(Boolean)
    .join(' ');

  if (state.icon) {
    state.icon.className = [buttonClassNames.icon, state.icon.className].filter(Boolean).join(' ');
  }

  return state;
};
