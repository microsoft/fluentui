'use client';

import { clsx } from 'clsx';
import type { MenuItemLinkSlots, MenuItemLinkState } from './MenuItemLink.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useMenuItemStyles_unstable } from '../MenuItem/useMenuItemStyles.styles.css';
import type { MenuItemState } from '../MenuItem/MenuItem.types';
import styles from './MenuItemLink.module.css';

export const menuItemLinkClassNames: SlotClassNames<MenuItemLinkSlots> = {
  root: 'fui-MenuItemLink',
  icon: 'fui-MenuItemLink__icon',
  checkmark: 'fui-MenuItemLink__checkmark',
  content: 'fui-MenuItemLink__content',
  secondaryContent: 'fui-MenuItemLink__secondaryContent',
};

/**
 * Apply styling to the MenuItemLink slots based on the state
 */
export const useMenuItemLinkStyles_unstable = (state: MenuItemLinkState): MenuItemLinkState => {
  useMenuItemStyles_unstable(state as MenuItemState);
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(menuItemLinkClassNames.root, styles.resetLink, state.root.className);

  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(menuItemLinkClassNames.icon, state.icon.className);
  }

  if (state.content) {
    // eslint-disable-next-line react-hooks/immutability
    state.content.className = clsx(menuItemLinkClassNames.content, state.content.className);
  }

  if (state.secondaryContent) {
    // eslint-disable-next-line react-hooks/immutability
    state.secondaryContent.className = clsx(menuItemLinkClassNames.secondaryContent, state.secondaryContent.className);
  }

  if (state.checkmark) {
    // eslint-disable-next-line react-hooks/immutability
    state.checkmark.className = clsx(menuItemLinkClassNames.checkmark, state.checkmark.className);
  }

  return state;
};
