'use client';

import { getComponentSlotClassName, type SlotClassNames } from '@fluentui/react-utilities';
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

  state.root.className = getComponentSlotClassName(menuButtonClassNames.root, state.root, {
    ...state,
    expanded: !!state.root['aria-expanded'],
  });

  if (state.icon) {
    state.icon.className = getComponentSlotClassName(menuButtonClassNames.icon, state.icon);
  }

  if (state.menuIcon) {
    state.menuIcon.className = getComponentSlotClassName(menuButtonClassNames.menuIcon, state.menuIcon);
  }

  return state;
};
