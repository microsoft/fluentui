'use client';

import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MenuButtonSlots, MenuButtonState } from './MenuButton.types';

export const menuButtonClassNames: SlotClassNames<MenuButtonSlots> = {
  root: 'fui-MenuButton',
  icon: 'fui-MenuButton__icon',
  menuIcon: 'fui-MenuButton__menuIcon',
};

/**
 * Attaches only semantic slot class names and state modifiers
 */
export const useMenuButtonStyles_unstable = (state: MenuButtonState): MenuButtonState => {
  'use no memo';

  const { appearance, disabled, disabledFocusable, shape, size, icon, iconOnly } = state;
  const expanded = !!state.root['aria-expanded'];

  state.root.className = [
    menuButtonClassNames.root,

    // Appearance
    appearance && `${menuButtonClassNames.root}--${appearance}`,

    // Size
    size && `${menuButtonClassNames.root}--${size}`,

    // Shape
    shape && `${menuButtonClassNames.root}--${shape}`,

    // Disabled styles
    disabled && `${menuButtonClassNames.root}--disabled`,
    disabledFocusable && `${menuButtonClassNames.root}--disabledFocusable`,

    // Expanded
    expanded && `${menuButtonClassNames.root}--expanded`,

    // Icons
    icon && iconOnly && `${menuButtonClassNames.root}--iconOnly`,

    // User provided class name
    state.root.className,
  ]
    .filter(Boolean)
    .join(' ');

  if (state.icon) {
    state.icon.className = [menuButtonClassNames.icon, state.icon.className].filter(Boolean).join(' ');
  }

  if (state.menuIcon) {
    state.menuIcon.className = [menuButtonClassNames.menuIcon, state.menuIcon.className].filter(Boolean).join(' ');
  }

  return state;
};
