'use client';

import { clsx } from 'clsx';
import { useCheckmarkStyles_unstable } from '../../selectable/useCheckmarkStyles.styles.css';
import { useMenuItemStyles_unstable } from '../MenuItem/useMenuItemStyles.styles.css';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MenuItemSlots } from '../index';
import type { MenuItemCheckboxState } from './MenuItemCheckbox.types';

export const menuItemCheckboxClassNames: SlotClassNames<Omit<MenuItemSlots, 'submenuIndicator'>> = {
  root: 'fui-MenuItemCheckbox',
  icon: 'fui-MenuItemCheckbox__icon',
  checkmark: 'fui-MenuItemCheckbox__checkmark',
  content: 'fui-MenuItemCheckbox__content',
  secondaryContent: 'fui-MenuItemCheckbox__secondaryContent',
  subText: 'fui-MenuItemCheckbox__subText',
};

export const useMenuItemCheckboxStyles_unstable = (state: MenuItemCheckboxState): MenuItemCheckboxState => {
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(menuItemCheckboxClassNames.root, state.root.className);

  if (state.content) {
    // eslint-disable-next-line react-hooks/immutability
    state.content.className = clsx(menuItemCheckboxClassNames.content, state.content.className);
  }

  if (state.secondaryContent) {
    // eslint-disable-next-line react-hooks/immutability
    state.secondaryContent.className = clsx(
      menuItemCheckboxClassNames.secondaryContent,
      state.secondaryContent.className,
    );
  }

  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(menuItemCheckboxClassNames.icon, state.icon.className);
  }

  if (state.checkmark) {
    // eslint-disable-next-line react-hooks/immutability
    state.checkmark.className = clsx(menuItemCheckboxClassNames.checkmark, state.checkmark.className);
  }

  if (state.subText) {
    // eslint-disable-next-line react-hooks/immutability
    state.subText.className = clsx(menuItemCheckboxClassNames.subText, state.subText.className);
  }

  useMenuItemStyles_unstable(state);
  useCheckmarkStyles_unstable(state);

  return state;
};
