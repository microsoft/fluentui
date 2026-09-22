import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { styleMenuItemSlots } from '../MenuItem/useMenuItemStyles.styles';
import type { MenuItemState } from '../MenuItem/MenuItem.types';
import menuItemStyles from '../MenuItem/MenuItem.module.css';
import type { MenuItemSwitchSlots, MenuItemSwitchState } from './MenuItemSwitch.types';
import styles from './MenuItemSwitch.module.css';

export const menuItemSwitchClassNames: SlotClassNames<MenuItemSwitchSlots> = {
  root: 'fui-MenuItemSwitch',
  icon: 'fui-MenuItemSwitch__icon',
  content: 'fui-MenuItemSwitch__content',
  secondaryContent: 'fui-MenuItemSwitch__secondaryContent',
  switchIndicator: 'fui-MenuItemSwitch__switchIndicator',
  subText: 'fui-MenuItemSwitch__subText',
};

export const useMenuItemSwitchStyles = (state: MenuItemSwitchState): MenuItemSwitchState => {
  styleMenuItemSlots(state as unknown as MenuItemState);
  state.root.className = clsx(menuItemSwitchClassNames.root, state.root.className);
  if (state.icon) {
    state.icon.className = clsx(menuItemSwitchClassNames.icon, state.icon.className);
  }
  if (state.content) {
    state.content.className = clsx(menuItemSwitchClassNames.content, state.content.className);
  }
  if (state.secondaryContent) {
    state.secondaryContent.className = clsx(
      menuItemSwitchClassNames.secondaryContent,
      state.secondaryContent.className,
    );
  }
  if (state.subText) {
    state.subText.className = clsx(menuItemSwitchClassNames.subText, state.subText.className);
  }
  if (state.switchIndicator) {
    state.switchIndicator.className = clsx(
      menuItemSwitchClassNames.switchIndicator,
      styles.switchIndicator,
      state.checked && styles.switchIndicatorChecked,
      state.subText && menuItemStyles.centeredSlot,
      state.switchIndicator.className,
    );
  }
  return state;
};
