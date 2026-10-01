import { applyOwnMenuItemClasses, styleMenuItemSlots } from '../MenuItem/useMenuItemStyles.styles';
import type { MenuItemRadioState } from './MenuItemRadio.types';

export const menuItemRadioClassNames = {
  root: 'fui-MenuItemRadio',
  icon: 'fui-MenuItemRadio__icon',
  checkmark: 'fui-MenuItemRadio__checkmark',
  content: 'fui-MenuItemRadio__content',
  secondaryContent: 'fui-MenuItemRadio__secondaryContent',
  subText: 'fui-MenuItemRadio__subText',
};

export const useMenuItemRadioStyles = (state: MenuItemRadioState): MenuItemRadioState => {
  applyOwnMenuItemClasses(state, menuItemRadioClassNames);
  styleMenuItemSlots(state);
  return state;
};
