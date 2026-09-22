import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { styleMenuItemSlots } from '../MenuItem/useMenuItemStyles.styles';
import type { MenuItemState } from '../MenuItem/MenuItem.types';
import type { MenuItemLinkSlots, MenuItemLinkState } from './MenuItemLink.types';
import styles from './MenuItemLink.module.css';

export const menuItemLinkClassNames: SlotClassNames<MenuItemLinkSlots> = {
  root: 'fui-MenuItemLink',
  icon: 'fui-MenuItemLink__icon',
  checkmark: 'fui-MenuItemLink__checkmark',
  content: 'fui-MenuItemLink__content',
  secondaryContent: 'fui-MenuItemLink__secondaryContent',
};

export const useMenuItemLinkStyles = (state: MenuItemLinkState): MenuItemLinkState => {
  styleMenuItemSlots(state as MenuItemState);
  state.root.className = clsx(menuItemLinkClassNames.root, styles.menuItemLink, state.root.className);
  if (state.icon) {
    state.icon.className = clsx(menuItemLinkClassNames.icon, state.icon.className);
  }
  if (state.checkmark) {
    state.checkmark.className = clsx(menuItemLinkClassNames.checkmark, state.checkmark.className);
  }
  if (state.content) {
    state.content.className = clsx(menuItemLinkClassNames.content, state.content.className);
  }
  if (state.secondaryContent) {
    state.secondaryContent.className = clsx(menuItemLinkClassNames.secondaryContent, state.secondaryContent.className);
  }
  return state;
};
