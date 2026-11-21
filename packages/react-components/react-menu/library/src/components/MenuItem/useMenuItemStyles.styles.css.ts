'use client';

import { clsx } from 'clsx';
import { useCheckmarkStyles_unstable } from '../../selectable/useCheckmarkStyles.styles.css';
import type { MenuItemCheckboxState } from '../MenuItemCheckbox/index';
import type { MenuItemSlots, MenuItemState } from './MenuItem.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import styles from './MenuItem.module.css';

export const menuItemClassNames: SlotClassNames<MenuItemSlots> = {
  root: 'fui-MenuItem',
  icon: 'fui-MenuItem__icon',
  checkmark: 'fui-MenuItem__checkmark',
  submenuIndicator: 'fui-MenuItem__submenuIndicator',
  content: 'fui-MenuItem__content',
  secondaryContent: 'fui-MenuItem__secondaryContent',
  subText: 'fui-MenuItem__subText',
};

/** Applies style classnames to slots */
export const useMenuItemStyles_unstable = (state: MenuItemState): MenuItemState => {
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    menuItemClassNames.root,
    styles.root,
    state.submenuOpen && styles.submenuOpen,
    state.disabled && styles.disabled,
    state.subText && styles.multiline,
    state.root.className,
  );
  if (state.content) {
    // eslint-disable-next-line react-hooks/immutability
    state.content.className = clsx(menuItemClassNames.content, styles.content, state.content.className);
  }
  if (state.checkmark) {
    // eslint-disable-next-line react-hooks/immutability
    state.checkmark.className = clsx(menuItemClassNames.checkmark, styles.checkmark, state.checkmark.className);
  }
  if (state.secondaryContent) {
    // eslint-disable-next-line react-hooks/immutability
    state.secondaryContent.className = clsx(
      menuItemClassNames.secondaryContent,
      styles.secondaryContent,
      state.secondaryContent.className,
    );
  }
  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(menuItemClassNames.icon, styles.icon, state.icon.className);
  }
  if (state.submenuIndicator) {
    // eslint-disable-next-line react-hooks/immutability
    state.submenuIndicator.className = clsx(
      menuItemClassNames.submenuIndicator,
      styles.submenuIndicator,
      state.submenuIndicator.className,
    );
  }
  if (state.subText) {
    // eslint-disable-next-line react-hooks/immutability
    state.subText.className = clsx(menuItemClassNames.subText, styles.subText, state.subText.className);
  }
  useCheckmarkStyles_unstable(state as MenuItemCheckboxState);
  return state;
};
