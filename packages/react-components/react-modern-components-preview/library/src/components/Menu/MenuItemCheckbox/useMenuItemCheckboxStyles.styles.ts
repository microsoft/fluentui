import { applyOwnMenuItemClasses, styleMenuItemSlots } from '../MenuItem/useMenuItemStyles.styles';
import type { MenuItemCheckboxState } from './MenuItemCheckbox.types';

export const menuItemCheckboxClassNames = {
  root: 'fui-MenuItemCheckbox',
  icon: 'fui-MenuItemCheckbox__icon',
  checkmark: 'fui-MenuItemCheckbox__checkmark',
  content: 'fui-MenuItemCheckbox__content',
  secondaryContent: 'fui-MenuItemCheckbox__secondaryContent',
  subText: 'fui-MenuItemCheckbox__subText',
};

export const useMenuItemCheckboxStyles = (state: MenuItemCheckboxState): MenuItemCheckboxState => {
  applyOwnMenuItemClasses(state, menuItemCheckboxClassNames);
  styleMenuItemSlots(state);
  return state;
};
